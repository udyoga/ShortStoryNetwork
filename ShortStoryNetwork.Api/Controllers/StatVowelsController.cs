using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShortStoryNetwork.Application.Services;
using ShortStoryNetwork.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatVowelsController : ControllerBase
    {
        private readonly IStatVowelsRepository _statVowels;

        public StatVowelsController(IStatVowelsRepository statVowelsRepository)
        {
            _statVowels = statVowelsRepository;
        }       

        [Authorize(Roles = "M")]
        [HttpPost("Search")]
        public IActionResult Search()
        {
            return Ok(_statVowels.GetAll());
        }

    }
}
