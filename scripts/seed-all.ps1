# Seed all data for OpportunityMap (PowerShell version)
# Run with: npm run seed (after adding to package.json)

Write-Host "🌱 Seeding schools..." -ForegroundColor Green
npx convex run seedSchools:seedSchools

Write-Host ""
Write-Host "🎓 Adding ALU (African Leadership University)..." -ForegroundColor Cyan
npx convex run seedALU:addALU

Write-Host ""
Write-Host "💰 Adding cost analysis to careers..." -ForegroundColor Green
npx convex run seedCostAnalysis:addCostAnalysisToCareers

Write-Host ""
Write-Host "💵 Adding cost analysis to ALL remaining careers..." -ForegroundColor Green
npx convex run seedAllCareerCosts:addCostToAllCareers

Write-Host ""
Write-Host "🔗 Linking schools to careers..." -ForegroundColor Green
npx convex run seedSchools:linkSchoolsToCareers

Write-Host ""
Write-Host "✅ All data seeded successfully!" -ForegroundColor Green

