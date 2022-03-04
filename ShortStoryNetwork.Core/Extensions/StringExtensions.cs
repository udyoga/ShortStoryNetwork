using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Core.Extensions
{
    public static class StringExtensions
    {
        private static Random random = new Random();

        public static string RandomString(this string strText, int length)
        {            
            return new string(Enumerable.Repeat(strText, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
