/**
 * Seed data for pilot partner schools in Rwanda
 * Run this once to populate initial school data
 */

import { mutation } from "./_generated/server";

export const seedSchools = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Check if schools already exist
    const existing = await ctx.db.query("schools").first();
    if (existing) {
      console.log("Schools already seeded");
      return { success: false, message: "Schools already exist" };
    }

    // We'll need to get actual career IDs after running this
    // For now, using placeholder structure
    
    const schools = [
      {
        name: "University of Rwanda",
        type: "university" as const,
        location: {
          city: "Kigali",
          district: "Gasabo",
        },
        website: "https://www.ur.ac.rw",
        contactEmail: "info@ur.ac.rw",
        contactPhone: "+250 788 300 300",
        programsOffered: [
          {
            name: "Bachelor of Science in Computer Science",
            duration: "4 years",
            tuitionPerYear: 600000,
            careerIds: [], // Will be populated with actual career IDs
          },
          {
            name: "Bachelor of Engineering (Civil)",
            duration: "4 years",
            tuitionPerYear: 700000,
            careerIds: [],
          },
          {
            name: "Bachelor of Business Administration",
            duration: "4 years",
            tuitionPerYear: 500000,
            careerIds: [],
          },
          {
            name: "Bachelor of Education",
            duration: "3 years",
            tuitionPerYear: 400000,
            careerIds: [],
          },
          {
            name: "Bachelor of Science in Nursing",
            duration: "4 years",
            tuitionPerYear: 600000,
            careerIds: [],
          },
        ],
        partnershipTier: "featured" as const,
        partnerSince: now,
        description:
          "The University of Rwanda is the largest public university in Rwanda, offering comprehensive programs across multiple campuses. Formed in 2013, UR combines the strengths of Rwanda's former public higher education institutions.",
        logo: "https://placehold.co/200x200/4ECDC4/FFFFFF?text=UR",
        accreditation: "Higher Education Council (HEC) Rwanda",
        establishedYear: 2013,
        studentCount: 32000,
        clickCount: 0,
        inquiryCount: 0,
        isActive: true,
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "IPRC Kigali",
        type: "technical_college" as const,
        location: {
          city: "Kigali",
          district: "Kicukiro",
        },
        website: "https://iprckigali.rp.ac.rw",
        contactEmail: "info@iprckigali.rp.ac.rw",
        contactPhone: "+250 788 555 000",
        programsOffered: [
          {
            name: "Diploma in Information Technology",
            duration: "3 years",
            tuitionPerYear: 350000,
            careerIds: [],
          },
          {
            name: "Diploma in Civil Engineering",
            duration: "3 years",
            tuitionPerYear: 300000,
            careerIds: [],
          },
          {
            name: "Diploma in Electrical Installation",
            duration: "2 years",
            tuitionPerYear: 250000,
            careerIds: [],
          },
          {
            name: "Diploma in Hospitality Management",
            duration: "2 years",
            tuitionPerYear: 300000,
            careerIds: [],
          },
        ],
        partnershipTier: "featured" as const,
        partnerSince: now,
        description:
          "IPRC Kigali is one of Rwanda's leading technical and vocational education institutions, providing hands-on training in various technical fields. Part of Rwanda Polytechnic network.",
        logo: "https://placehold.co/200x200/FF6B35/FFFFFF?text=IPRC",
        accreditation: "Rwanda Polytechnic (RP)",
        establishedYear: 2009,
        studentCount: 4500,
        clickCount: 0,
        inquiryCount: 0,
        isActive: true,
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Adventist University of Central Africa",
        type: "university" as const,
        location: {
          city: "Kigali",
          district: "Gasabo",
        },
        website: "https://www.auca.ac.rw",
        contactEmail: "admissions@auca.ac.rw",
        contactPhone: "+250 788 309 000",
        programsOffered: [
          {
            name: "Bachelor of Business Administration",
            duration: "4 years",
            tuitionPerYear: 2000000,
            careerIds: [],
          },
          {
            name: "Bachelor of Education",
            duration: "3 years",
            tuitionPerYear: 1800000,
            careerIds: [],
          },
          {
            name: "Bachelor of Public Health",
            duration: "4 years",
            tuitionPerYear: 2200000,
            careerIds: [],
          },
          {
            name: "Bachelor of Theology",
            duration: "4 years",
            tuitionPerYear: 1500000,
            careerIds: [],
          },
        ],
        partnershipTier: "partner" as const,
        partnerSince: now,
        description:
          "AUCA is a leading private Christian university offering quality education in business, public health, theology, and education. Known for its strong values-based education and international partnerships.",
        logo: "https://placehold.co/200x200/FFE66D/000000?text=AUCA",
        accreditation: "HEC Rwanda",
        establishedYear: 1984,
        studentCount: 1800,
        clickCount: 0,
        inquiryCount: 0,
        isActive: true,
        featured: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "University of Kigali",
        type: "university" as const,
        location: {
          city: "Kigali",
          district: "Gasabo",
        },
        website: "https://www.uok.ac.rw",
        contactEmail: "info@uok.ac.rw",
        contactPhone: "+250 788 304 000",
        programsOffered: [
          {
            name: "Bachelor of Laws (LLB)",
            duration: "4 years",
            tuitionPerYear: 1500000,
            careerIds: [],
          },
          {
            name: "Bachelor of Business Administration",
            duration: "4 years",
            tuitionPerYear: 1400000,
            careerIds: [],
          },
          {
            name: "Bachelor of Information Technology",
            duration: "4 years",
            tuitionPerYear: 1600000,
            careerIds: [],
          },
          {
            name: "Bachelor of Accounting",
            duration: "4 years",
            tuitionPerYear: 1400000,
            careerIds: [],
          },
        ],
        partnershipTier: "partner" as const,
        partnerSince: now,
        description:
          "University of Kigali (UoK) is a private university offering programs in business, law, IT, and engineering. Known for practical, industry-focused education and strong graduate employment rates.",
        logo: "https://placehold.co/200x200/95E1D3/000000?text=UoK",
        accreditation: "HEC Rwanda",
        establishedYear: 1996,
        studentCount: 5000,
        clickCount: 0,
        inquiryCount: 0,
        isActive: true,
        featured: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Tumba College of Technology",
        type: "technical_college" as const,
        location: {
          city: "Huye",
          district: "Huye",
        },
        website: "https://tct.ac.rw",
        contactEmail: "info@tct.ac.rw",
        contactPhone: "+250 788 450 000",
        programsOffered: [
          {
            name: "Diploma in ICT",
            duration: "3 years",
            tuitionPerYear: 350000,
            careerIds: [],
          },
          {
            name: "Diploma in Electronics",
            duration: "3 years",
            tuitionPerYear: 350000,
            careerIds: [],
          },
          {
            name: "Diploma in Telecommunications",
            duration: "3 years",
            tuitionPerYear: 350000,
            careerIds: [],
          },
        ],
        partnershipTier: "listed" as const,
        description:
          "Tumba College of Technology specializes in ICT, electronics, and telecommunications education. Known for producing skilled technicians and engineers for Rwanda's growing tech sector.",
        logo: "https://placehold.co/200x200/4ECDC4/FFFFFF?text=TCT",
        accreditation: "Rwanda Polytechnic (RP)",
        establishedYear: 1997,
        studentCount: 2000,
        clickCount: 0,
        inquiryCount: 0,
        isActive: true,
        featured: false,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Insert all schools
    const insertedIds = [];
    for (const school of schools) {
      const id = await ctx.db.insert("schools", school);
      insertedIds.push(id);
    }

    console.log(`Successfully seeded ${insertedIds.length} schools`);

    return {
      success: true,
      message: `Seeded ${insertedIds.length} schools`,
      schoolIds: insertedIds,
    };
  },
});

/**
 * Helper mutation to link schools to careers
 * Run this AFTER careers exist in the database
 * 
 * Usage: Update the career title-to-ID mapping and run
 */
export const linkSchoolsToCareers = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all schools and careers
    const schools = await ctx.db.query("schools").collect();
    const careers = await ctx.db.query("careers").collect();

    // Create a mapping of career titles to IDs
    const careerMap = new Map(careers.map(c => [c.title.toLowerCase(), c._id]));

    const updates = [];

    for (const school of schools) {
      const updatedPrograms = school.programsOffered.map(program => {
        const careerIds = [];

        // Map program names to career IDs
        if (program.name.includes("Computer Science") || program.name.includes("Information Technology") || program.name.includes("ICT")) {
          const softwareDevId = careerMap.get("software developer");
          const dataScientistId = careerMap.get("data scientist");
          if (softwareDevId) careerIds.push(softwareDevId);
          if (dataScientistId) careerIds.push(dataScientistId);
        }

        if (program.name.includes("Civil Engineering") || program.name.includes("Civil")) {
          const civilEngId = careerMap.get("civil engineer");
          if (civilEngId) careerIds.push(civilEngId);
        }

        if (program.name.includes("Business Administration")) {
          const businessAnalystId = careerMap.get("business analyst");
          const accountantId = careerMap.get("accountant");
          const marketingId = careerMap.get("marketing manager");
          if (businessAnalystId) careerIds.push(businessAnalystId);
          if (accountantId) careerIds.push(accountantId);
          if (marketingId) careerIds.push(marketingId);
        }

        if (program.name.includes("Education") || program.name.includes("Teacher")) {
          const teacherId = careerMap.get("teacher");
          if (teacherId) careerIds.push(teacherId);
        }

        if (program.name.includes("Nursing")) {
          const nurseId = careerMap.get("nurse");
          if (nurseId) careerIds.push(nurseId);
        }

        if (program.name.includes("Law") || program.name.includes("LLB")) {
          const lawyerId = careerMap.get("lawyer");
          if (lawyerId) careerIds.push(lawyerId);
        }

        if (program.name.includes("Accounting")) {
          const accountantId = careerMap.get("accountant");
          if (accountantId) careerIds.push(accountantId);
        }

        if (program.name.includes("Graphic") || program.name.includes("Design")) {
          const designerId = careerMap.get("graphic designer");
          if (designerId) careerIds.push(designerId);
        }

        return {
          ...program,
          careerIds: careerIds as any,
        };
      });

      await ctx.db.patch(school._id, {
        programsOffered: updatedPrograms,
        updatedAt: Date.now(),
      });

      updates.push(school.name);
    }

    return {
      success: true,
      message: `Linked ${updates.length} schools to careers`,
      updatedSchools: updates,
    };
  },
});

