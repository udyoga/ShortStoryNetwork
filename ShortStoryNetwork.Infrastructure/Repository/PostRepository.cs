using ShortStoryNetwork.Application.Services;
using ShortStoryNetwork.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Infrastructure.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly SSNDbContext _DbContext;

        public PostRepository(SSNDbContext sSNDbContext)
        {
            _DbContext = sSNDbContext;
        }

        public async Task<int> Save(Post post)
        {
            try
            {
                await _DbContext.Posts.AddAsync(post);
                return await _DbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                //--- Log exeptions
                throw;
            }
        }

        public List<Post> SearchPosts(string keyword)
        {
            try
            {
                var posts = _DbContext.Posts.Select(a => a);

                if (!string.IsNullOrEmpty(keyword))
                {
                    posts = posts.Where(a => a.Post1.ToLower().Contains(keyword));
                }

                return posts.OrderByDescending(a => a.Date).ToList();

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
