# Data Collection & Update Methodology

**Document Version:** 1.0  
**Last Updated:** December 10, 2025  
**Purpose:** Standardized process for collecting, verifying, and updating career/education data

---

## 🎯 OBJECTIVE

Maintain accurate, Rwanda-specific data for:
- Career salary ranges
- Educational institution tuition fees
- Program-to-career mappings
- Scholarship information
- Market demand insights

---

## 📊 DATA SOURCES HIERARCHY

### Tier 1: Primary Sources (Highest Trust)
**Use First, Trust Most**

1. **Official Institution Websites**
   - University websites (prospectus, fee schedules)
   - Government ministry publications
   - Regulatory body announcements (HEC Rwanda)

2. **Direct Communication**
   - Phone calls to admissions offices
   - Email correspondence with HR departments
   - Official responses to inquiries

3. **Government Publications**
   - Ministry of Education reports
   - Rwanda Development Board data
   - National statistics (NISR)

**When to Use:** Always start here. If data is current (< 12 months), this is sufficient.

---

### Tier 2: Secondary Sources (Good for Cross-Reference)
**Use to Verify Tier 1**

1. **Job Posting Platforms**
   - **JobInRwanda.com** - Main Rwanda job board
   - **LinkedIn Rwanda** - Professional network
   - **BrighterMonday** - Regional board

2. **Industry Reports**
   - ICT Chamber Rwanda publications
   - Professional association surveys
   - Private sector federation reports

3. **News Articles**
   - New Times Rwanda
   - KT Press
   - Other reputable local media

**When to Use:** To validate primary data, spot trends, fill gaps.

---

### Tier 3: Tertiary Sources (Use with Caution)
**Requires Multiple Confirmations**

1. **Social Media**
   - LinkedIn posts (salary discussions)
   - Professional group discussions
   - Alumni network insights

2. **Informal Networks**
   - Personal contacts in industries
   - Student feedback
   - Word-of-mouth

**When to Use:** Only when primary sources unavailable AND confirmed by 3+ independent sources.

---

## ✅ VERIFICATION STANDARDS

### For Tuition Fees

**Minimum Requirements:**
- ✅ Source date within last 12 months
- ✅ Confirmed on official institution website OR
- ✅ Written confirmation from admissions office
- ✅ Distinguish between government-sponsored vs self-pay

**Red Flags (Don't Use):**
- ❌ Student forum estimates
- ❌ Data older than 2 years
- ❌ "I heard that..." information
- ❌ Conflicting reports without resolution

**Documentation Required:**
```markdown
## [Institution Name]
- **Tuition:** X RWF/year
- **Source:** [URL or Contact]
- **Date Verified:** YYYY-MM-DD
- **Notes:** Government scholarship available / Self-pay only
```

---

### For Salary Ranges

**Minimum Requirements:**
- ✅ Based on 5+ job postings OR
- ✅ Official salary scale (government jobs) OR
- ✅ 3+ industry contacts confirming range

**Best Practices:**
- Show ranges (min-max), not single numbers
- Break down by experience level when possible
- Note if Kigali-specific (higher than other cities)
- Include currency (RWF) and timeframe (per year)

**Red Flags (Don't Use):**
- ❌ USD salaries without context
- ❌ "Up to X" marketing language without real data
- ❌ International salary sites (Glassdoor, PayScale - not Rwanda-specific)
- ❌ Single anecdote

**Documentation Required:**
```markdown
## [Career Title]
- **Entry Level (0-2 years):** X - Y RWF/year
- **Mid Level (3-5 years):** Y - Z RWF/year
- **Senior (5+ years):** Z - W RWF/year
- **Sources:** 
  - JobInRwanda: 12 postings analyzed (Dec 2025)
  - [Company X] HR contact (confirmed range)
- **Date Verified:** YYYY-MM-DD
```

---

## 🔄 UPDATE FREQUENCY

### Annual Updates (Critical)
**When:** July-August (before academic year)
- All tuition fees
- School program catalogs
- Accreditation status

### Quarterly Updates (Important)
**When:** Jan, Apr, Jul, Oct
- Salary ranges (top 20 careers)
- Market demand analysis
- New program additions

### Monthly Monitoring (Best Effort)
**When:** First week of each month
- New job posting trends
- Major salary shifts
- New school partnerships

### Ad-Hoc Updates (As Needed)
- Breaking news (policy changes)
- New institutions launching
- Major economic shifts

---

## 📝 DATA COLLECTION PROCESS

### Step 1: Identify Data Gaps
```bash
# Run this to see careers with outdated salary data
npx convex run careers:findOutdatedSalaries
```

**Questions to Ask:**
- What data is older than 12 months?
- What data has "placeholder" or "estimate" notes?
- What new careers should we add?
- What schools are missing?

---

### Step 2: Research Plan
Create checklist:
```markdown
## Research Tasks for [Month/Quarter]

### Priority 1: Tuition Verification
- [ ] UR: Call +250 788 300 300
- [ ] IPRC: Email info@iprckigali.rp.ac.rw
- [ ] AUCA: Check website updates

### Priority 2: Salary Verification
- [ ] Software Developer: Check JobInRwanda (need 5+ postings)
- [ ] Nurse: Contact King Faisal Hospital HR
- [ ] Teacher: Verify REB salary scale

### Priority 3: New Data
- [ ] Add ALU Rwanda programs
- [ ] Add emerging tech careers (AI/ML roles?)
```

---

### Step 3: Execute Research

**For Tuition:**
1. Visit official website
2. Look for "Admissions" → "Fees" or "Programs"
3. If not found: Email admissions office
4. If urgent: Call during business hours (8 AM - 5 PM)
5. Document: Screenshot + save PDF

**For Salaries:**
1. Go to JobInRwanda.com
2. Search career title
3. Open 10-15 recent postings
4. Note salary ranges (if disclosed)
5. Create spreadsheet:
   ```
   Job Title | Company | Salary Range | Date Posted | URL
   ```

---

### Step 4: Verify & Cross-Check

**Two-Source Rule:**
Every data point needs ≥2 sources OR 1 official source

**Example:**
```markdown
✅ GOOD:
- UR CS Tuition: 600,000 RWF/year
  - Source 1: UR website (ur.ac.rw/admissions/fees)
  - Source 2: Phone confirmation with admissions (Dec 10, 2025)
  
❌ INSUFFICIENT:
- UoK CS Tuition: 1,400,000 RWF/year
  - Source: A student told me
```

---

### Step 5: Document Findings

Update `docs/RESEARCH_FINDINGS.md`:
```markdown
### University of Rwanda
**Source:** https://www.ur.ac.rw/admissions
**Date Verified:** 2025-12-10
**Contact:** Called +250 788 300 300, spoke with [Name]

**Computer Science Program:**
- Duration: 4 years
- Tuition: 600,000 RWF/year (government scholarship)
- Self-Pay: 2,500,000 RWF/year (verified with admissions)
- Additional Costs: ~500,000 RWF/year (books, accommodation)
- Scholarship: 100% government loan for qualified students

**Notes:** 
- Tuition unchanged since 2023
- Next review scheduled for August 2026
```

---

### Step 6: Update Database

Create seed file: `convex/updateDataDecember2025.ts`

```typescript
import { mutation } from "./_generated/server";

export const updateURTuition = mutation({
  args: {},
  handler: async (ctx) => {
    const ur = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("name"), "University of Rwanda"))
      .first();
    
    if (ur) {
      // Update programs with verified data
      const updatedPrograms = ur.programsOffered.map(program => {
        if (program.name.includes("Computer Science")) {
          return {
            ...program,
            tuitionPerYear: 2500000, // VERIFIED self-pay rate
          };
        }
        return program;
      });
      
      await ctx.db.patch(ur._id, {
        programsOffered: updatedPrograms,
        scholarshipInfo: "Government scholarship available covering 600,000 RWF/year for qualified students. Self-pay students: 2,500,000 RWF/year.",
        updatedAt: Date.now()
      });
      
      return { success: true, message: "UR tuition updated" };
    }
    
    return { success: false, message: "UR not found" };
  }
});

export const updateSoftwareDeveloperSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Software Developer"))
      .first();
    
    if (career) {
      await ctx.db.patch(career._id, {
        salaryMin: 4000000,  // Updated based on JobInRwanda analysis
        salaryMax: 18000000, // Senior developer range
        salaryProgression: [
          { level: "Junior Developer", years: "0-2", range: "4M - 7M RWF/year" },
          { level: "Mid-level Developer", years: "3-5", range: "7M - 12M RWF/year" },
          { level: "Senior Developer", years: "5-8", range: "12M - 18M RWF/year" },
          { level: "Lead/Architect", years: "8+", range: "18M - 30M RWF/year" }
        ]
      });
      
      return { success: true };
    }
    
    return { success: false };
  }
});

// Run all updates
export const runAllUpdates = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];
    
    results.push(await ctx.runMutation(api.updateDataDecember2025.updateURTuition));
    results.push(await ctx.runMutation(api.updateDataDecember2025.updateSoftwareDeveloperSalary));
    
    return { results };
  }
});
```

Then run:
```bash
npx convex run updateDataDecember2025:runAllUpdates
```

---

## 🚫 COMMON PITFALLS TO AVOID

### Pitfall 1: Using Outdated Data
**Problem:** Using 2022 tuition fees in 2025  
**Solution:** Always check date, add "Last verified: YYYY-MM-DD"

### Pitfall 2: Copying International Data
**Problem:** Using US/UK salary data for Rwanda  
**Solution:** Only use Rwanda-specific sources

### Pitfall 3: Single-Source Reliance
**Problem:** One student says UR costs 1M RWF  
**Solution:** Verify with official source + cross-check

### Pitfall 4: Missing Context
**Problem:** "Nurse salary: 5M RWF" (but is this public/private? entry/senior?)  
**Solution:** Always include experience level, sector, location

### Pitfall 5: Not Documenting Sources
**Problem:** "I updated the data" (from where?)  
**Solution:** Every change requires documented source

---

## 📋 QUALITY CHECKLIST

Before updating database, verify:

**For Each Data Point:**
- [ ] Source is documented (URL or contact)
- [ ] Date verified is recorded
- [ ] Data is Rwanda-specific
- [ ] Data is current (< 12 months old)
- [ ] Cross-checked with 2nd source (if possible)
- [ ] Conflicts resolved with additional research

**For Tuition Fees:**
- [ ] Distinguish government scholarship vs self-pay
- [ ] Include scholarship information
- [ ] Note additional costs (if significant)
- [ ] Confirm program duration

**For Salaries:**
- [ ] Show as range (min-max), not single number
- [ ] Break down by experience if data available
- [ ] Include currency (RWF) and timeframe (/year)
- [ ] Note sector if relevant (public vs private)

---

## 🎯 SUCCESS METRICS

**Data Quality Indicators:**
- ✅ 90%+ of data verified within last 12 months
- ✅ 100% of data has documented source
- ✅ Zero conflicts between sources (or documented resolution)
- ✅ All tier-1 institutions updated quarterly

**User Impact Indicators:**
- Students report data matches reality
- Mentors confirm salary ranges
- Schools don't report incorrect tuition
- Fewer "this doesn't seem right" reports

---

## 🔧 TOOLS & TEMPLATES

### Spreadsheet Template
Create: `research/salary_analysis_[MONTH].xlsx`

**Columns:**
| Career Title | Company | Salary Min | Salary Max | Experience | Location | Source URL | Date Posted |
|--------------|---------|------------|------------|------------|----------|------------|-------------|

### Contact Log Template
```markdown
## Contact: [Institution/Company Name]
- **Date:** YYYY-MM-DD
- **Method:** Phone / Email / In-person
- **Contact Person:** [Name, Title]
- **Purpose:** Verify tuition fees for [Program]
- **Response:** [Summary]
- **Follow-up:** [Action needed]
- **Documents:** [Links to attachments]
```

---

## 📚 APPENDIX: Quick Reference

### Key Contacts
```
University of Rwanda
- Phone: +250 788 300 300
- Email: info@ur.ac.rw
- Website: https://www.ur.ac.rw

IPRC Kigali
- Email: info@iprckigali.rp.ac.rw
- Website: https://iprckigali.rp.ac.rw

HEC Rwanda (Accreditation)
- Website: https://hec.gov.rw
```

### Useful Search Queries
```
JobInRwanda: site:jobinrwanda.com "software developer" salary
LinkedIn: Rwanda [Job Title] hiring
Google: site:.rw tuition fees [University Name]
```

### Code Snippets
```bash
# Check what data needs updating
npx convex run careers:list | grep "salaryMin"

# View school data
npx convex run schools:list

# Test data update before running
npx convex run updateData:testUpdate --dryRun
```

---

**Document Owner:** Development Team  
**Review Schedule:** Quarterly  
**Next Review:** March 2026
