using ShortStoryNetwork.Core.Entities;
using ShortStoryNetwork.Core.UserDefined;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Application.Services
{
    public interface IUserInfoRepository
    {
        AuthResult Authenticate(AuthParam authParam);
        Task<int> Save(UserInfo userInfo);
        Task<int> UpdateUser(UserUpdateParam userUpdateParam);
        List<SearchUser> SearchUsers(UserInfo userInfo);
        UserInfo GetUserByEmail(string email);
    }
}
