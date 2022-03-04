using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShortStoryNetwork.Application.Services;
using ShortStoryNetwork.Core.Entities;
using ShortStoryNetwork.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _post;
        private readonly IStatVowelsRepository _statVowels;

        public PostController(IPostRepository postRepository,
            IStatVowelsRepository statVowelsRepository)
        {
            _post = postRepository;
            _statVowels = statVowelsRepository;
        }

        [Authorize]
        [HttpPost("save")]
        public async Task<IActionResult> save(Post post)
        {
            if (post == null || string.IsNullOrEmpty(post.Post1))
                return NoContent();

            post.Date = DateTime.Now;

            string[] words = post.Post1.ToLower().Split(" ", StringSplitOptions.RemoveEmptyEntries);

            if (words.Count() > 500)
                return Content("Word count should not be greater than 500");

            await _statVowels.UpdateStatVowels(words);

            return Ok(await _post.Save(post));
        }

        [Authorize]
        [HttpPost("Search")]
        public IActionResult Search(string keyword)
        {
            return Ok(_post.SearchPosts(keyword?.Trim()));
        }
    }
}
