using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShortStoryNetwork.Application.Services;
using ShortStoryNetwork.Core.Entities;
using ShortStoryNetwork.Core.UserDefined;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Infrastructure.Repository
{
    public class UserInfoRepository : IUserInfoRepository
    {
        private readonly SSNDbContext _DbContext;
        private readonly IOptionsMonitor<JwtConfig> _jwtConfig;

        public UserInfoRepository(SSNDbContext sSNDbContext,
            IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            _DbContext = sSNDbContext;
            _jwtConfig = optionsMonitor;
        }

        public AuthResult Authenticate(AuthParam authParam)
        {
            AuthResult authResult = new AuthResult();

            UserInfo userInfo = _DbContext.UserInfos.FirstOrDefault(a=>a.EmailAddress.ToLower()== authParam.EmailAddress.ToLower() &&
                a.PasswordHash == authParam.PasswordHash
            );

            if (userInfo == null)
            {
                authResult.Success = false;
            }
            else {
                authResult.Success = true;
                authResult.Token = GenerateJwtToken(userInfo);
            }

            return authResult;
        }

        public UserInfo GetUserByEmail(string email)
        {
            try
            {
                return _DbContext.UserInfos.FirstOrDefault(a => a.EmailAddress.ToLower() == email.ToLower());                
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> Save(UserInfo userInfo)
        {
            try
            {
                await _DbContext.UserInfos.AddAsync(userInfo);
                return await _DbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }            
        }

        public List<SearchUser> SearchUsers(UserInfo userInfo)
        {
            try
            { 
                List<SearchUser> searchUser = _DbContext.SearchUsers.OrderByDescending(a=>a.LatestPostdate).ToList();
                return searchUser;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> UpdateUser(UserUpdateParam userUpdateParam)
        {
            UserInfo userInfo = _DbContext.UserInfos.Find(userUpdateParam.UserId);

            if (userInfo == null)
                return 0;

            userInfo.IsBanned = userUpdateParam.IsBanned;
            userInfo.IsEditor = userUpdateParam.IsEditor;
            _DbContext.Entry(userInfo).State = EntityState.Modified;
            return await _DbContext.SaveChangesAsync();
        }

        private string GenerateJwtToken(UserInfo user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_jwtConfig.CurrentValue.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.UserId),
                    new Claim(ClaimTypes.Email.ToString(), user.EmailAddress),
                    new Claim(ClaimTypes.Role, user.UserRole),                    
                }),
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
