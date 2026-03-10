import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Booking, FAQ, Project, Stats } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) {
        return {
          happyCustomers: BigInt(5000),
          yearsExperience: BigInt(12),
          citiesServed: BigInt(20),
          projectsCompleted: BigInt(15000),
        };
      }
      return actor.getStats();
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFAQs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      city,
      serviceType,
      message,
    }: {
      name: string;
      phone: string;
      city: string;
      serviceType: string;
      message: string | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(name, phone, city, serviceType, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
