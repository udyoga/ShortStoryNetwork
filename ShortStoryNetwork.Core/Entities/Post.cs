using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ShortStoryNetwork.Core.Entities
{
    [Table("Post")]
    public partial class Post
    {
        [Key]
        public Guid PostId { get; set; }
        [StringLength(12)]
        public string UserId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        [Column("Post")]
        public string Post1 { get; set; }
    }
}
