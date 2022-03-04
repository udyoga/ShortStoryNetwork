using ShortStoryNetwork.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Application.Services
{
    public interface IStatVowelsRepository
    {
        Task<int> UpdateStatVowels(string[] words);
        List<StatVowel> GetAll();
    }
}
