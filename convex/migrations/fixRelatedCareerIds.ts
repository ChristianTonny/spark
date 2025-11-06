import { mutation } from "../_generated/server";

/**
 * Migration to fix relatedCareerIds from placeholder strings to real Convex IDs
 * 
 * This creates meaningful career relationships based on:
 * - Similar RIASEC personality types
 * - Related industries and sectors
 * - Shared skill requirements
 * - Natural career progression paths
 * 
 * Run once via: npx convex run migrations/fixRelatedCareerIds:fixRelatedCareerIds
 */
export const fixRelatedCareerIds = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("Starting relatedCareerIds migration...");
    
    // Fetch all careers
    const careers = await ctx.db.query("careers").collect();
    console.log(`Found ${careers.length} careers to update`);
    
    // Create title-to-ID mapping for easy lookup
    const titleToId: Record<string, string> = {};
    careers.forEach(career => {
      titleToId[career.title] = career._id;
    });
    
    // Define meaningful career relationships based on actual database titles
    // Each career points to 2-4 related careers
    const relationships: Record<string, string[]> = {
      // Technology & Data
      "Software Developer": [
        "Data Scientist",
        "Digital Marketer",
        "Mobile Money Agent / Fintech Specialist"
      ],
      
      "Data Scientist": [
        "Software Developer",
        "Financial Analyst",
        "Marketing Manager"
      ],
      
      "Mobile Money Agent / Fintech Specialist": [
        "Software Developer",
        "Financial Analyst",
        "Digital Marketer"
      ],
      
      // Healthcare
      "Medical Doctor": [
        "Registered Nurse",
        "Healthcare Administrator",
        "Environmental Scientist"
      ],
      
      "Registered Nurse": [
        "Medical Doctor",
        "Healthcare Administrator",
      ],
      
      "Healthcare Administrator": [
        "Medical Doctor",
        "Registered Nurse",
        "Financial Analyst"
      ],
      
      // Education
      "Secondary School Teacher": [
        "Healthcare Administrator",
        "Tourism & Hospitality Manager",
      ],
      
      // Business & Finance
      "Financial Analyst": [
        "Data Scientist",
        "Marketing Manager",
        "Healthcare Administrator"
      ],
      
      "Marketing Manager": [
        "Digital Marketer",
        "Graphic Designer",
        "Tourism & Hospitality Manager"
      ],
      
      "Digital Marketer": [
        "Marketing Manager",
        "Graphic Designer",
        "Software Developer"
      ],
      
      // Creative
      "Graphic Designer": [
        "Digital Marketer",
        "Marketing Manager",
      ],
      
      // Agriculture & Environment
      "Agricultural Officer": [
        "Environmental Scientist",
        "Renewable Energy Technician",
      ],
      
      "Environmental Scientist": [
        "Agricultural Officer",
        "Renewable Energy Technician",
        "Medical Doctor"
      ],
      
      "Renewable Energy Technician": [
        "Environmental Scientist",
        "Mining Engineer",
        "Agricultural Officer"
      ],
      
      // Tourism & Hospitality
      "Tourism & Hospitality Manager": [
        "Marketing Manager",
        "Logistics Coordinator",
      ],
      
      // Engineering & Construction
      "Civil Engineer": [
        "Architect",
        "Construction Manager",
        "Environmental Scientist"
      ],
      
      "Architect": [
        "Civil Engineer",
        "Construction Manager",
      ],
      
      "Construction Manager": [
        "Civil Engineer",
        "Architect",
        "Mining Engineer"
      ],
      
      "Mining Engineer": [
        "Construction Manager",
        "Renewable Energy Technician",
        "Environmental Scientist"
      ],
      
      // Operations
      "Logistics Coordinator": [
        "Tourism & Hospitality Manager",
        "Construction Manager",
      ],
    };
    
    let updatedCount = 0;
    let errorCount = 0;
    const errors: string[] = [];
    
    // Update each career with real IDs
    for (const career of careers) {
      try {
        const relatedTitles = relationships[career.title] || [];
        
        // Convert titles to real Convex IDs
        const relatedIds = relatedTitles
          .map(title => titleToId[title])
          .filter(id => id !== undefined);
        
        // Update the career
        await ctx.db.patch(career._id, {
          relatedCareerIds: relatedIds
        });
        
        updatedCount++;
        console.log(`✓ Updated ${career.title} with ${relatedIds.length} related careers`);
      } catch (error) {
        errorCount++;
        const errorMsg = `Failed to update ${career.title}: ${error}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }
    
    console.log("\n=== Migration Complete ===");
    console.log(`Successfully updated: ${updatedCount} careers`);
    console.log(`Errors: ${errorCount}`);
    
    if (errors.length > 0) {
      console.log("\nErrors encountered:");
      errors.forEach(err => console.log(`  - ${err}`));
    }
    
    return {
      success: true,
      updatedCount,
      errorCount,
      errors,
      totalCareers: careers.length,
    };
  },
});
