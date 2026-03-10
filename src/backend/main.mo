import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Booking Inquiry
  type Booking = {
    id : Nat;
    name : Text;
    phone : Text;
    city : Text;
    serviceType : Text;
    message : ?Text;
    timestamp : Int;
  };

  module Booking {
    public func compareByTimestamp(booking1 : Booking, booking2 : Booking) : Order.Order {
      Int.compare(booking1.timestamp, booking2.timestamp);
    };
  };

  // FAQ Item
  type FAQ = {
    question : Text;
    answer : Text;
  };

  module FAQ {
    public func compare(faq1 : FAQ, faq2 : FAQ) : Order.Order {
      Text.compare(faq1.question, faq2.question);
    };
  };

  // Project Item
  type Project = {
    title : Text;
    category : Text;
    description : Text;
  };

  module Project {
    public func compare(project1 : Project, project2 : Project) : Order.Order {
      Text.compare(project1.title, project2.title);
    };
  };

  // Stats
  public type Stats = {
    projectsCompleted : Nat;
    citiesServed : Nat;
    happyCustomers : Nat;
    yearsExperience : Nat;
  };

  let bookings = Map.empty<Nat, Booking>();
  let faqItems = Map.empty<Text, FAQ>();
  let projects = Map.empty<Text, Project>();
  var nextBookingId = 1;

  let stats = {
    projectsCompleted = 750;
    citiesServed = 6;
    happyCustomers = 3000;
    yearsExperience = 20;
  };

  // Booking Inquiry Management
  public shared ({ caller }) func submitBooking(name : Text, phone : Text, city : Text, serviceType : Text, message : ?Text) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;

    let booking : Booking = {
      id;
      name;
      phone;
      city;
      serviceType;
      message;
      timestamp = Time.now();
    };

    bookings.add(id, booking);
    id;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    bookings.values().toArray().sort(Booking.compareByTimestamp);
  };

  // FAQ Management
  public query ({ caller }) func getFAQs() : async [FAQ] {
    faqItems.values().toArray().sort();
  };

  public shared ({ caller }) func addFAQ(question : Text, answer : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add FAQs");
    };
    let faq : FAQ = {
      question;
      answer;
    };
    faqItems.add(question, faq);
  };

  // Projects Gallery Management
  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray().sort();
  };

  public shared ({ caller }) func addProject(title : Text, category : Text, description : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add projects");
    };
    let project : Project = {
      title;
      category;
      description;
    };
    projects.add(title, project);
  };

  // Stats
  public query ({ caller }) func getStats() : async Stats {
    stats;
  };
};
