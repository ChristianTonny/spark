#!/bin/bash

# Seed all data for OpportunityMap
# Run with: npm run seed (after adding to package.json)

echo "🌱 Seeding schools..."
npx convex run seedSchools:seedSchools

echo ""
echo "💰 Adding cost analysis to careers..."
npx convex run seedCostAnalysis:addCostAnalysisToCareers

echo ""
echo "🔗 Linking schools to careers..."
npx convex run seedSchools:linkSchoolsToCareers

echo ""
echo "✅ All data seeded successfully!"

