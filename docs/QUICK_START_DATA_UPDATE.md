# Quick Start Guide: Updating Career & School Data

**For:** New developers working on data updates  
**Time:** 15 minutes to read, then start researching

---

## 🚀 YOUR TASK SUMMARY

You need to:
1. **Research** accurate Rwanda-specific data
2. **Verify** with official sources
3. **Update** the database with accurate information
4. **Document** what you changed and why

---

## 📁 FILES YOU'LL WORK WITH

### Read These First (Understanding)
- `convex/schema.ts` - Database structure
- `convex/seedSchools.ts` - Current school data
- `convex/seed.ts` - Current career data
- `docs/RESEARCH_FINDINGS.md` - Your research notes
- `docs/DATA_COLLECTION_METHODOLOGY.md` - How to research

### You'll Create These (Your Work)
- `convex/updateAccurateData2025.ts` - Your data updates
- Updates to `docs/RESEARCH_FINDINGS.md` - Your findings

---

## ⚡ QUICK START - FIRST STEPS

### Step 1: Start Your Research (Today)

```bash
# 1. Open research document
code docs/RESEARCH_FINDINGS.md

# 2. Start filling it with what you find
# 3. Use this checklist:
```

**Immediate Tasks:**
- [ ] Visit JobInRwanda.com - browse tech jobs (note 5-10 salaries)
- [ ] Visit ur.ac.rw - find Computer Science tuition
- [ ] Call UR: +250 788 300 300 (ask about CS fees)
- [ ] Check LinkedIn Rwanda - search "Software Developer Rwanda" salaries

---

### Step 2: Document Your Findings (Same Day)

As you research, update `docs/RESEARCH_FINDINGS.md`:

```markdown
## University of Rwanda - VERIFIED
**Date:** 2025-12-10
**Source:** Called +250 788 300 300, spoke with Jane in Admissions
**Finding:** CS tuition is 2,800,000 RWF/year for self-pay students
**Government Scholarship:** Covers 600,000 RWF/year

## Software Developer Salaries - IN PROGRESS
**Date:** 2025-12-10
**Source:** JobInRwanda.com search "software developer"
**Sample Jobs:**
1. Awesomity Lab - Mid-level - 8M RWF/year (posted Dec 5)
2. Irembo - Junior - 5M RWF/year (posted Dec 3)
3. Andela - Senior - 15M RWF/year (posted Nov 28)

**Conclusion:** Current range 5M-15M seems accurate, but update to 5M-18M for seniors
```

---

### Step 3: Create Update File (After Research)

Create: `convex/updateAccurateData2025.ts`

```typescript
/**
 * December 2025 Data Updates
 * Based on research from RESEARCH_FINDINGS.md
 * Run with: npx convex run updateAccurateData2025:updateAllData
 */

import { mutation } from "./_generated/server";

// Update University of Rwanda tuition based on research
export const updateURTuition = mutation({
  args: {},
  handler: async (ctx) => {
    const ur = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("name"), "University of Rwanda"))
      .first();
    
    if (!ur) {
      return { success: false, message: "University of Rwanda not found" };
    }
    
    // Update programs with YOUR VERIFIED data
    const updatedPrograms = ur.programsOffered.map(program => {
      if (program.name.includes("Computer Science")) {
        return {
          ...program,
          tuitionPerYear: 2800000, // YOUR RESEARCHED VALUE - CHANGE THIS
        };
      }
      if (program.name.includes("Civil Engineering")) {
        return {
          ...program,
          tuitionPerYear: 2600000, // YOUR RESEARCHED VALUE - CHANGE THIS
        };
      }
      // Add more programs as you research them
      return program;
    });
    
    await ctx.db.patch(ur._id, {
      programsOffered: updatedPrograms,
      scholarshipInfo: "Government scholarship covers 600,000 RWF/year for qualified students. Self-sponsored students pay full tuition.", // YOUR VERIFIED INFO
      updatedAt: Date.now()
    });
    
    return { 
      success: true, 
      message: "Updated UR tuition fees",
      changes: updatedPrograms.length + " programs updated"
    };
  }
});

// Update Software Developer salary based on JobInRwanda research
export const updateSoftwareDeveloperSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Software Developer"))
      .first();
    
    if (!career) {
      return { success: false, message: "Software Developer career not found" };
    }
    
    await ctx.db.patch(career._id, {
      // Update these with YOUR RESEARCH
      salaryMin: 5000000,   // Based on your JobInRwanda findings
      salaryMax: 18000000,  // Based on your research
      
      // Add detailed breakdown
      salaryProgression: [
        { 
          level: "Junior Developer (0-2 years)", 
          years: "0-2", 
          range: "5M - 8M RWF/year" 
        },
        { 
          level: "Mid-level Developer (3-5 years)", 
          years: "3-5", 
          range: "8M - 13M RWF/year" 
        },
        { 
          level: "Senior Developer (5-8 years)", 
          years: "5-8", 
          range: "13M - 18M RWF/year" 
        },
        { 
          level: "Lead/Architect (8+ years)", 
          years: "8+", 
          range: "18M - 30M RWF/year" 
        }
      ]
    });
    
    return { success: true, message: "Updated Software Developer salary data" };
  }
});

// Add more update functions for other careers/schools

// Master function to run all updates
export const updateAllData = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];
    
    // Run all your updates
    try {
      const urResult = await ctx.runMutation(api.updateAccurateData2025.updateURTuition);
      results.push({ task: "UR Tuition", ...urResult });
    } catch (error) {
      results.push({ task: "UR Tuition", success: false, error: String(error) });
    }
    
    try {
      const salaryResult = await ctx.runMutation(api.updateAccurateData2025.updateSoftwareDeveloperSalary);
      results.push({ task: "Software Developer Salary", ...salaryResult });
    } catch (error) {
      results.push({ task: "Software Developer Salary", success: false, error: String(error) });
    }
    
    return { 
      success: true, 
      message: "Data update complete",
      results 
    };
  }
});
```

---

### Step 4: Test Your Updates

```bash
# Before running on real database, test it
npx convex run updateAccurateData2025:updateURTuition

# If successful, check the data changed
npx convex run schools:list

# Run all updates
npx convex run updateAccurateData2025:updateAllData
```

---

## 🎯 SPECIFIC RESEARCH TASKS

### Task 1: Verify University of Rwanda Tuition

**What to do:**
1. Call: +250 788 300 300
2. Ask: "What is the tuition fee for Computer Science Bachelor's for self-sponsored students?"
3. Ask: "What scholarship options are available?"
4. Note: Write down the person's name and answers

**Questions to Ask:**
- What is the tuition for Computer Science (self-sponsored)?
- What is the tuition for Civil Engineering?
- Is there a difference between government-sponsored and self-pay?
- What scholarships are available?
- When do tuition fees typically change (annually)?

**Expected Range:**
- Government scholarship: 600k - 1M RWF/year
- Self-sponsored: 2M - 4M RWF/year (to verify)

---

### Task 2: Analyze Software Developer Salaries

**What to do:**
1. Go to: https://www.jobinrwanda.com
2. Search: "software developer" OR "developer" OR "programmer"
3. Open 15-20 recent job postings
4. Create spreadsheet with:
   - Company name
   - Job title
   - Salary range (if listed)
   - Experience required
   - Date posted

**Companies to Check:**
- Awesomity Lab
- Andela Rwanda
- Irembo
- BSE (Rwanda Stock Exchange)
- MTN Rwanda (tech positions)

**Note:** Many jobs won't list salary - that's normal. Collect what you can find.

---

### Task 3: Quick Survey of Other Key Careers

**Do a quick check (15 min each) for:**
1. **Nurse** - Check King Faisal Hospital careers page
2. **Teacher** - Research REB (Rwanda Education Board) salary scale
3. **Accountant** - Check JobInRwanda for "accountant" postings

Just get a rough sense - you can deep-dive later.

---

## 📊 DATA UPDATE TEMPLATE

Copy this into your update file for each item:

```typescript
// TEMPLATE - Duplicate and modify for each career
export const update[CareerName]Salary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "[Career Title]"))
      .first();
    
    if (!career) {
      return { success: false, message: "Career not found" };
    }
    
    await ctx.db.patch(career._id, {
      salaryMin: 0000000,  // YOUR RESEARCH - CHANGE THIS
      salaryMax: 0000000,  // YOUR RESEARCH - CHANGE THIS
      
      // Optional: Add detailed breakdown if you have the data
      salaryProgression: [
        { level: "Entry Level", years: "0-2", range: "XM - YM RWF/year" },
        { level: "Mid Level", years: "3-5", range: "YM - ZM RWF/year" },
        { level: "Senior Level", years: "5+", range: "ZM - WM RWF/year" }
      ]
    });
    
    return { success: true };
  }
});
```

---

## 🚨 IMPORTANT RULES

### DO:
✅ Always document your source (URL, contact name, date)  
✅ Call institutions when websites aren't clear  
✅ Cross-check data with 2 sources when possible  
✅ Use RWF (Rwandan Francs) for all amounts  
✅ Note when data is "self-pay" vs "government scholarship"  
✅ Test your update on ONE item first before running all  

### DON'T:
❌ Use data from US/UK salary sites (Glassdoor, PayScale, etc.)  
❌ Trust single forum posts or "I heard..."  
❌ Copy old data without verification  
❌ Run updates without testing one first  
❌ Forget to document your sources  
❌ Use data older than 2 years  

---

## 🎓 EXAMPLE: COMPLETE WORKFLOW

Here's how you'd update ONE school:

### 1. Research
```
Action: Called IPRC Kigali
Number: +250 788 555 000
Contact: Jean in Admissions
Date: Dec 10, 2025

Q: "What is the tuition for IT Diploma?"
A: "350,000 RWF per year"

Q: "Has this changed recently?"
A: "No, same since 2023"

Q: "Are scholarships available?"
A: "Yes, some students get Rwanda Polytechnic scholarships"
```

### 2. Document (in RESEARCH_FINDINGS.md)
```markdown
### IPRC Kigali - VERIFIED ✅
**Date:** 2025-12-10
**Method:** Phone call
**Contact:** Jean, Admissions Officer (+250 788 555 000)

**IT Diploma:**
- Tuition: 350,000 RWF/year
- Duration: 3 years
- Total: ~1,050,000 RWF
- Scholarship: Rwanda Polytechnic scholarship available (competitive)
- Unchanged since 2023
```

### 3. Update Code
```typescript
export const updateIPRCTuition = mutation({
  args: {},
  handler: async (ctx) => {
    const iprc = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("name"), "IPRC Kigali"))
      .first();
    
    if (iprc) {
      const updatedPrograms = iprc.programsOffered.map(program => {
        if (program.name.includes("Information Technology")) {
          return {
            ...program,
            tuitionPerYear: 350000, // VERIFIED Dec 10, 2025
          };
        }
        return program;
      });
      
      await ctx.db.patch(iprc._id, {
        programsOffered: updatedPrograms,
        scholarshipInfo: "Rwanda Polytechnic scholarships available on competitive basis",
        updatedAt: Date.now()
      });
      
      return { success: true };
    }
    return { success: false };
  }
});
```

### 4. Run & Test
```bash
# Test this one update
npx convex run updateAccurateData2025:updateIPRCTuition

# Check it worked
npx convex run schools:getById --args '{"id":"<iprc-id>"}'

# If good, commit your changes
git add convex/updateAccurateData2025.ts docs/RESEARCH_FINDINGS.md
git commit -m "Update IPRC Kigali tuition - verified Dec 10, 2025"
```

---

## 📞 CONTACTS CHEAT SHEET

Copy this for quick reference:

```
University of Rwanda
☎️ +250 788 300 300
📧 info@ur.ac.rw
🌐 www.ur.ac.rw

IPRC Kigali
☎️ +250 788 555 000
📧 info@iprckigali.rp.ac.rw

AUCA
☎️ +250 788 309 000
📧 admissions@auca.ac.rw

University of Kigali
☎️ +250 788 304 000
📧 info@uok.ac.rw

JobInRwanda
🌐 www.jobinrwanda.com
```

---

## ✅ DAILY CHECKLIST

**Day 1: Initial Research**
- [ ] Read this guide fully
- [ ] Browse JobInRwanda for 30 minutes
- [ ] Call 2 institutions
- [ ] Document findings in RESEARCH_FINDINGS.md

**Day 2: Continue Research**
- [ ] Call remaining institutions
- [ ] Analyze 20+ job postings
- [ ] Create spreadsheet of salary data
- [ ] Update research document

**Day 3: Start Coding**
- [ ] Create updateAccurateData2025.ts file
- [ ] Write update function for 1 school (test)
- [ ] Write update function for 1 career (test)
- [ ] Test updates work

**Day 4: Complete Updates**
- [ ] Add remaining update functions
- [ ] Test each one individually
- [ ] Run complete update
- [ ] Verify data in dashboard

**Day 5: Documentation & PR**
- [ ] Final update to RESEARCH_FINDINGS.md
- [ ] Add notes to any uncertain data
- [ ] Commit changes
- [ ] Create pull request

---

## 🆘 TROUBLESHOOTING

### "I can't find salary info on JobInRwanda"
**Solution:** Many jobs don't list salary. That's okay. Use the ones that do, and note "based on X job postings" in your research doc.

### "The school website doesn't have tuition fees"
**Solution:** Call them! That's why we have phone numbers. Or email admissions.

### "I got different numbers from 2 sources"
**Solution:** 
1. Which source is more official?
2. Is one more recent?
3. Call a 3rd source to break the tie
4. Document the conflict in research notes

### "My update function isn't working"
**Solution:**
```bash
# Check the career/school exists
npx convex run careers:list | grep "Software Developer"

# Check your function syntax
npx convex dev  # This will show errors

# Test with console.log
console.log("Career found:", career);
```

### "I don't know if my data is good enough"
**Solution:** Ask yourself:
- Do I have a source? ✅
- Is it from 2024-2025? ✅
- Is it Rwanda-specific? ✅
- Would I trust this if I were a student? ✅

If yes to all = good enough to use!

---

## 📈 MEASURING SUCCESS

**You'll know you're doing well when:**
- ✅ Every data point has a documented source
- ✅ Sources are from 2024-2025
- ✅ You can explain where each number came from
- ✅ Data updates run without errors
- ✅ Your research doc is detailed and clear

**Week 1 Goal:** Update 5 schools OR 10 careers with verified data

---

## 🎯 NEXT STEPS

1. **Right now:** Read `docs/RESEARCH_FINDINGS.md`
2. **Today:** Start calling institutions
3. **This week:** Complete research for top 5 careers
4. **Next week:** Code and test your updates
5. **End of month:** Submit PR with verified data

---

**Need Help?**
- Stuck on Convex mutations? Check `convex/seed.ts` for examples
- Not sure about data quality? Review `DATA_COLLECTION_METHODOLOGY.md`
- Code not working? Ask in team chat with error message

**You've got this! Start with one phone call and build from there. 📞**
