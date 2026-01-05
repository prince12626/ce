import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/user.model.js";

export const inngest = new Inngest({
        id: "ecommerce",
});

const syncUser = inngest.createFunction(
        { id: "syncUser" },
        {
                event: "clerk/user.created",
        },
        async ({ event }) => {
                console.log(event);
                await connectDB();
                const {
                        id,
                        email_addresses,
                        first_name,
                        last_name,
                        image_url,
                } = event.data;
                const newUser = {
                        clerkId: id,
                        email: email_addresses[0]?.email_address,
                        name:
                                `${first_name || ""} ${last_name || ""}` ||
                                "User",
                        imageURL: image_url,
                        addresses: [],
                        wishlist: [],
                };
                await User.create(newUser);
        }
);

const deleteuser = inngest.createFunction(
        { id: "deleteUser" },
        {
                event: "clerk/user.deleted",
        },
        async ({ event }) => {
                await connectDB();
                await User.deleteOne({ clerkId: event.data.id });
        }
);

export const functions = [syncUser, deleteuser];
