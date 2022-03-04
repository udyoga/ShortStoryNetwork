using ShortStoryNetwork.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Application.Services
{
    public interface IPostRepository
    {
        Task<int> Save(Post post);
        List<Post> SearchPosts(string keyword);
    }
}
