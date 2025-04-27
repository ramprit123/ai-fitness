import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Verify the webhook signature
    const svix_id = request.headers.get("svix-id");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_signature = request.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing webhook headers", { status: 400 });
    }

    // Get the webhook body
    const body = await request.json();
    const { type, data } = body;

    // Handle user creation event
    if (type === "user.created") {
      const userData = {
        clerkId: data.id,
        email: data.email_addresses[0]?.email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
        height: undefined,
        weight: undefined,
        activityLevel: undefined,
        preferredUnitSystem: undefined,
        equipmentIds: undefined,
        injuriesLimitations: undefined,
        fitnessLevel: undefined,
        preferredWorkoutTypes: undefined,
        preferredMuscleGroups: undefined
      };
      await ctx.runMutation(api.users.createUser, userData);
      return new Response("User created successfully", { status: 200 });
    }

    return new Response("Webhook received", { status: 200 });
  }),
});

export default http;
