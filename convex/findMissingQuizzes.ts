import { query } from "./_generated/server";

export const findMissingQuizzes = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    
    const withQuizzes = careers.filter(c => c.realityQuiz).map(c => ({
      id: c._id,
      title: c.title
    }));
    
    const withoutQuizzes = careers.filter(c => !c.realityQuiz).map(c => ({
      id: c._id,
      title: c.title,
      category: c.category
    }));
    
    return {
      total: careers.length,
      withQuizzes: withQuizzes.length,
      withoutQuizzes: withoutQuizzes.length,
      careersWithQuizzes: withQuizzes,
      careersNeedingQuizzes: withoutQuizzes
    };
  },
});
