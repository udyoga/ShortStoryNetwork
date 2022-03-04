using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ShortStoryNetwork.Core.Entities
{
    public partial class StatVowel
    {
        [Key]
        public Guid Id { get; set; }
        [Column(TypeName = "date")]
        public DateTime? Date { get; set; }
        public int? SingleVowelCount { get; set; }
        public int? PairVowelCount { get; set; }
        public int? TotalWordCount { get; set; }
    }
}
