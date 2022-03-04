using Microsoft.EntityFrameworkCore;
using ShortStoryNetwork.Application.Services;
using ShortStoryNetwork.Core.Entities;
using ShortStoryNetwork.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Infrastructure.Repository
{
    public class StatVowelsRepository : IStatVowelsRepository
    {
        private readonly SSNDbContext _DbContext;

        public StatVowelsRepository(SSNDbContext sSNDbContext)
        {
            _DbContext = sSNDbContext;
        }

        public List<StatVowel> GetAll()
        {
            try
            {
                return _DbContext.StatVowels.OrderByDescending(a => a.Date).ToList();              
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> UpdateStatVowels(string[] words)
        {
            StatVowel statVowel = _DbContext.StatVowels.SingleOrDefault(a=>a.Date==DateTime.Now.Date);           

            if (statVowel == null)
            {
                statVowel = new StatVowel() { 
                    PairVowelCount = 0,
                    TotalWordCount = 0,
                    SingleVowelCount = 0,
                    Date = DateTime.Now
                };
                statVowel = PostHelper.GetVowelCounts(words, statVowel);
                _DbContext.StatVowels.Add(statVowel);                
            }
            else
            {
                statVowel = PostHelper.GetVowelCounts(words, statVowel);
                _DbContext.Entry(statVowel).State = EntityState.Modified;                
            }
            return await _DbContext.SaveChangesAsync();         
        }
    }
}
