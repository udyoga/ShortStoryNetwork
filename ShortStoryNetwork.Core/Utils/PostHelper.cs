using ShortStoryNetwork.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Core.Utils
{
    public static class PostHelper
    {
        public static StatVowel GetVowelCounts(string[] words, StatVowel statVowel)
        {            
            char[] vowels = { 'a', 'e', 'i', 'o', 'u' };           
            statVowel.TotalWordCount += words.Count();

            foreach (var item in words)
            {
                bool? _vowelType = null;
                char[] charList = item.ToCharArray();

                for (int i = 0; i < charList.Count(); i++)
                {
                    if (i > 0 
                        && vowels.Contains(charList[i-1]) == true
                        && vowels.Contains(charList[i]) == true)
                    {
                        _vowelType = true;
                        break;
                    }
                    else if (vowels.Contains(charList[i]) == true)
                    {
                        _vowelType = false;
                   }
                }             

                switch (_vowelType)
                {
                    case true:
                        statVowel.PairVowelCount++;
                        break;

                    case false:
                        statVowel.SingleVowelCount++;
                        break;

                    default:                       
                        break;
                }               
            }
            return statVowel;
        }
        
    }
}
