using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Core.UserDefined
{
    public class UserSearchParam
    {
        public string Keyword { get; set; }
        public bool isBanded { get; set; }
    }

    public class UserUpdateParam
    {       
        public string UserId { get; set; }        
        public bool IsEditor { get; set; }
        public bool IsBanned { get; set; }
    }
}
