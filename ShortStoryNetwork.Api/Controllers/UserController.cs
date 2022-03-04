using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShortStoryNetwork.Application.Services;
using ShortStoryNetwork.Core.Entities;
using ShortStoryNetwork.Core.Extensions;
using ShortStoryNetwork.Core.UserDefined;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserInfoRepository _userInfo;

        public UserController(IUserInfoRepository userInfo)
        {
            _userInfo = userInfo;
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate(AuthParam authParam)
        {
            AuthResult authResult = _userInfo.Authenticate(authParam);

            if (authResult.Success)
            {
                return Ok(authResult);
            }
            else {
                return BadRequest("Invalid login");
            }
        }

        [Authorize(Roles = "M")]
        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserUpdateParam userUpdateParam)
        {
            int result = await _userInfo.UpdateUser(userUpdateParam);

            if (result == 0)
                return NotFound();

            return Ok(result);
        }

        [HttpPost("save")]
        public async Task<IActionResult> save(UserInfo userInfo)
        {
            if (_userInfo.GetUserByEmail(userInfo.EmailAddress) != null)
                return BadRequest("Email exist");

            userInfo.UserId = userInfo.FirstName.RandomString(10);
            return Ok(await _userInfo.Save(userInfo));
        }

        [Authorize]
        [HttpPost("Search")]
        public IActionResult Search(UserSearchParam userSearchParam)
        {            
            return Ok( _userInfo.SearchUsers(null));
        }
        
    }
}
