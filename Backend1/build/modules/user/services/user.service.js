"use strict";
// import { UsersType } from "../../../database/interfaces/user.interface";
// import { UserRepository } from "../repositories/user.repository";
// export class UserService {
//   private userRepository: UserRepository;
//   constructor() {
//     this.userRepository = new UserRepository();
//   }
//   public async createUserAndHandleEvents(userData: UsersType): Promise<UsersType> {
//     if (!userData.email) throw new Error("No email");
//     if (!userData.password) throw new Error("No password");
//     // Adjusted field names to match the Prisma schema
//     const userDetail = {
//       email: userData.email,
//       password: userData.password,
//         first_name: userData.firstName || "John",  // Updated field name
//         last_name: userData.lastName || "Doe",    // Updated field name
//     };
//     // Create user in the database
//     const user = await this.userRepository.create(
//       userDetail.email,
//       userDetail.password,
//       userDetail.first_name,  // Updated field name
//       userDetail.last_name    // Updated field name
//     );
//     // Example event data
//     const events = [
//       {
//           "id": "1",
//           "ticket_id": "6E8AF2uuCKuxvW3GWeTQ7o",
//           "certificate_url": "",
//           "created_at": "2024-08-10T17:30:28.148Z",
//           "updated_at": "2024-08-10T17:30:28.148Z",
//           "fk_event": 2,
//           "fk_user": 2,
//           "fk_slot": "11"
//       },
//       {
//           "id": "2",
//           "ticket_id": "ivVmcT8NED2Cu2VMU9Q41j",
//           "certificate_url": "",
//           "created_at": "2024-08-10T17:40:40.000Z",
//           "updated_at": "2024-08-10T17:40:40.000Z",
//           "fk_event": 2,
//           "fk_user": 3,
//           "fk_slot": "12"
//       },
//       {
//           "id": "3",
//           "ticket_id": "9xZuY2HbRlJvW4fPxZQ3Qd",
//           "certificate_url": "",
//           "created_at": "2024-08-10T17:50:55.500Z",
//           "updated_at": "2024-08-10T17:50:55.500Z",
//           "fk_event": 3,
//           "fk_user": 4,
//           "fk_slot": "13"
//       },
//       {
//           "id": "4",
//           "ticket_id": "b5Df8WmTnC9Ru1QoLrV4S7",
//           "certificate_url": "",
//           "created_at": "2024-08-10T18:01:10.250Z",
//           "updated_at": "2024-08-10T18:01:10.250Z",
//           "fk_event": 4,
//           "fk_user": 5,
//           "fk_slot": "14"
//       },
//       {
//           "id": "5",
//           "ticket_id": "J6KmT4uUj7HvZ9pNwL6R8Q",
//           "certificate_url": "",
//           "created_at": "2024-08-10T18:12:22.750Z",
//           "updated_at": "2024-08-10T18:12:22.750Z",
//           "fk_event": 5,
//           "fk_user": 6,
//           "fk_slot": "15"
//       },
//       {
//           "id": "6",
//           "ticket_id": "Q8RnY2FgKvE5U1DsNqP9J0",
//           "certificate_url": "",
//           "created_at": "2024-08-10T18:23:35.300Z",
//           "updated_at": "2024-08-10T18:23:35.300Z",
//           "fk_event": 6,
//           "fk_user": 7,
//           "fk_slot": "16"
//       },
//       {
//           "id": "7",
//           "ticket_id": "R9UwL6GhTvX3P8dKqF4M2B",
//           "certificate_url": "",
//           "created_at": "2024-08-10T18:34:44.600Z",
//           "updated_at": "2024-08-10T18:34:44.600Z",
//           "fk_event": 7,
//           "fk_user": 8,
//           "fk_slot": "17"
//       },
//       {
//           "id": "8",
//           "ticket_id": "A3ZiX8LpUkC2T9HwR5N6E7",
//           "certificate_url": "",
//           "created_at": "2024-08-10T18:45:55.100Z",
//           "updated_at": "2024-08-10T18:45:55.100Z",
//           "fk_event": 8,
//           "fk_user": 9,
//           "fk_slot": "18"
//       },
//       {
//           "id": "9",
//           "ticket_id": "D4LvJ1MpO9TfQ2RwK8X3C6",
//           "certificate_url": "",
//           "created_at": "2024-08-10T18:57:10.400Z",
//           "updated_at": "2024-08-10T18:57:10.400Z",
//           "fk_event": 9,
//           "fk_user": 10,
//           "fk_slot": "19"
//       },
//       {
//           "id": "10",
//           "ticket_id": "F7YvP3JqW2UbL8RhT9M5Z0",
//           "certificate_url": "",
//           "created_at": "2024-08-10T19:08:22.900Z",
//           "updated_at": "2024-08-10T19:08:22.900Z",
//           "fk_event": 10,
//           "fk_user": 11,
//           "fk_slot": "20"
//       },
//       {
//           "id": "11",
//           "ticket_id": "M5PzJ9RkT3L2W8VfQ7N6Y1",
//           "certificate_url": "",
//           "created_at": "2024-08-10T19:19:35.500Z",
//           "updated_at": "2024-08-10T19:19:35.500Z",
//           "fk_event": 11,
//           "fk_user": 12,
//           "fk_slot": "21"
//       },
//       {
//           "id": "12",
//           "ticket_id": "H2TkM9VwF5L7Q3NpX8R6J0",
//           "certificate_url": "",
//           "created_at": "2024-08-10T19:30:50.100Z",
//           "updated_at": "2024-08-10T19:30:50.100Z",
//           "fk_event": 12,
//           "fk_user": 13,
//           "fk_slot": "22"
//       },
//       {
//           "id": "13",
//           "ticket_id": "V8LpJ3WnF5Q7M2RxT9K4Y1",
//           "certificate_url": "",
//           "created_at": "2024-08-10T19:41:59.200Z",
//           "updated_at": "2024-08-10T19:41:59.200Z",
//           "fk_event": 13,
//           "fk_user": 14,
//           "fk_slot": "23"
//       },
//       {
//           "id": "14",
//           "ticket_id": "C7QwM1RkT3J8V5LpN9X2Y0",
//           "certificate_url": "",
//           "created_at": "2024-08-10T19:53:12.600Z",
//           "updated_at": "2024-08-10T19:53:12.600Z",
//           "fk_event": 14,
//           "fk_user": 15,
//           "fk_slot": "24"
//       },
//       {
//           "id": "15",
//           "ticket_id": "B4NpL8RkT3J9Q2XwF5Y7M0",
//           "certificate_url": "",
//           "created_at": "2024-08-10T20:04:25.800Z",
//           "updated_at": "2024-08-10T20:04:25.800Z",
//           "fk_event": 15,
//           "fk_user": 16,
//           "fk_slot": "25"
//       }]
//     // Handle events and link with the user
//     for (const event of events) {
//       const slotId: string | null = event.fk_slot || null;
//       if (slotId) {
//         try {
//           const eventDetails = await this.userRepository.findEventBySlotId(slotId);
//           if (eventDetails) {
//             // Create or link user with the event
//             // Ensure to provide all required arguments
//               const testObj = await this.userRepository.handleTestCreationOrUpdate(eventDetails.id, user.id, eventDetails.startTime, eventDetails.endTime);
//               const result = await this.userRepository.createResult(testObj.id, Number(eventDetails.id), 0);
//               console.log(result);
//               await this.userRepository.createUserEvent(user.id, eventDetails.id, testObj.id);
//           }
//         } catch (error) {
//           console.error('Error linking event:', error);
//         }
//       }
//     }
//     return user;
//   }
// }
