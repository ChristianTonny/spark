import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

/**
 * Bulk Operations for Educators
 * Handle bulk student imports via CSV
 */

interface StudentImportData {
  firstName: string;
  lastName: string;
  email: string;
  gradeLevel: string;
  school: string;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{ row: number; email: string; error: string }>;
  createdStudents: Array<{ email: string; temporaryPassword: string }>;
}

/**
 * Import multiple students from CSV data
 * Only educators can perform this operation
 */
export const importStudents = mutation({
  args: {
    students: v.array(
      v.object({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        gradeLevel: v.string(),
        school: v.string(),
      })
    ),
  },
  handler: async (ctx, args): Promise<ImportResult> => {
    // Verify the current user is an educator
    const currentUser = await getCurrentUserOrThrow(ctx);
    
    if (currentUser.role !== "educator") {
      throw new Error("Only educators can import students");
    }

    const result: ImportResult = {
      success: 0,
      failed: 0,
      errors: [],
      createdStudents: [],
    };

    // Process each student
    for (let i = 0; i < args.students.length; i++) {
      const student = args.students[i];
      const rowNum = i + 2; // +2 because CSV row 1 is header, array is 0-indexed

      try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(student.email)) {
          result.failed++;
          result.errors.push({
            row: rowNum,
            email: student.email,
            error: "Invalid email format",
          });
          continue;
        }

        // Check if user already exists
        const existingUser = await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", student.email.toLowerCase()))
          .unique();

        if (existingUser) {
          result.failed++;
          result.errors.push({
            row: rowNum,
            email: student.email,
            error: "Email already exists in system",
          });
          continue;
        }

        // Generate temporary password (in production, this would be sent via email)
        const tempPassword = `Spark${Math.random().toString(36).slice(-8)}!`;

        // Note: In a real implementation, you would:
        // 1. Create the user in Clerk via their API
        // 2. Send them an email with the temporary password
        // 3. Then sync to Convex
        
        // For now, we'll create a placeholder in Convex
        // This student will need to sign up through Clerk separately
        const userId = await ctx.db.insert("users", {
          email: student.email.toLowerCase(),
          firstName: student.firstName.trim(),
          lastName: student.lastName.trim(),
          role: "student",
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${student.firstName} ${student.lastName}&backgroundColor=ffb627`,
          createdAt: Date.now(),
        });

        // Create student profile
        await ctx.db.insert("studentProfiles", {
          userId,
          gradeLevel: student.gradeLevel.trim(),
          school: student.school.trim(),
          district: "", // Can be added to CSV if needed
          interests: [], // Will be filled in by student later
        });

        result.success++;
        result.createdStudents.push({
          email: student.email,
          temporaryPassword: tempPassword,
        });
      } catch (error) {
        result.failed++;
        result.errors.push({
          row: rowNum,
          email: student.email,
          error: error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    return result;
  },
});

/**
 * Get import template (returns example CSV structure)
 */
export const getImportTemplate = mutation({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getCurrentUserOrThrow(ctx);
    
    if (currentUser.role !== "educator") {
      throw new Error("Only educators can access this");
    }

    return {
      headers: ["firstName", "lastName", "email", "gradeLevel", "school"],
      example: [
        {
          firstName: "Jean",
          lastName: "Mukamana",
          email: "jean.mukamana@school.rw",
          gradeLevel: "Senior 5",
          school: "Lycée de Kigali",
        },
        {
          firstName: "Aline",
          lastName: "Uwamahoro",
          email: "aline.uwamahoro@school.rw",
          gradeLevel: "Senior 6",
          school: "Green Hills Academy",
        },
      ],
    };
  },
});
