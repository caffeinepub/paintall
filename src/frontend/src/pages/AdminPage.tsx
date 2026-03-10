import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Calendar, PaintBucket, Users } from "lucide-react";
import { useEffect } from "react";
import { useGetAllBookings, useIsCallerAdmin } from "../hooks/useQueries";

function formatTimestamp(ts: bigint): string {
  // Motoko timestamps are in nanoseconds
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: bookings, isLoading: bookingsLoading } = useGetAllBookings();

  useEffect(() => {
    if (!adminLoading && isAdmin === false) {
      navigate({ to: "/" });
    }
  }, [isAdmin, adminLoading, navigate]);

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-4 border-brand-orange border-t-transparent animate-spin mx-auto mb-4"
            data-ocid="admin.loading_state"
          />
          <p className="text-muted-foreground">Verifying admin access…</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-brand-warm-gray">
      {/* Header */}
      <header className="bg-brand-navy text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PaintBucket className="w-6 h-6 text-brand-orange" />
            <span className="font-display text-xl font-bold">
              PaintAll Admin
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/10"
            onClick={() => navigate({ to: "/" })}
            data-ocid="admin.link"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-navy">
              Bookings Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              All site visit booking requests
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-border text-center">
              <p className="text-2xl font-bold text-brand-orange font-display">
                {bookings?.length ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Users className="w-3 h-3" /> Total Bookings
              </p>
            </div>
          </div>
        </div>

        {bookingsLoading ? (
          <div className="space-y-3" data-ocid="admin.loading_state">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : !bookings || bookings.length === 0 ? (
          <div
            className="bg-white rounded-2xl border border-border p-16 text-center"
            data-ocid="admin.empty_state"
          >
            <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-xl font-semibold text-foreground">
              No bookings yet
            </p>
            <p className="text-muted-foreground mt-1">
              Booking submissions will appear here once customers fill the form.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <Table data-ocid="admin.table">
              <TableHeader>
                <TableRow className="bg-brand-warm-gray">
                  <TableHead className="font-semibold text-brand-navy">
                    ID
                  </TableHead>
                  <TableHead className="font-semibold text-brand-navy">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-brand-navy">
                    Phone
                  </TableHead>
                  <TableHead className="font-semibold text-brand-navy">
                    City
                  </TableHead>
                  <TableHead className="font-semibold text-brand-navy">
                    Service
                  </TableHead>
                  <TableHead className="font-semibold text-brand-navy">
                    Message
                  </TableHead>
                  <TableHead className="font-semibold text-brand-navy">
                    Date &amp; Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, idx) => (
                  <TableRow
                    key={booking.id.toString()}
                    className="hover:bg-brand-warm-gray/50 transition-colors"
                    data-ocid="admin.row"
                  >
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      #{(idx + 1).toString().padStart(3, "0")}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {booking.name}
                    </TableCell>
                    <TableCell className="font-mono">{booking.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-brand-orange/40 text-brand-navy"
                      >
                        {booking.city}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-brand-orange text-white hover:bg-brand-orange/90">
                        {booking.serviceType}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                      {booking.message || <span className="italic">—</span>}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatTimestamp(booking.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
