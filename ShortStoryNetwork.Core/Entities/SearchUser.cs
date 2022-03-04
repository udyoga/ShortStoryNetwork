using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ShortStoryNetwork.Core.Entities
{
    [Keyless]
    public partial class SearchUser
    {
        [StringLength(320)]
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool? IsBanned { get; set; }
        public bool? IsEditor { get; set; }
        [Required]
        [StringLength(12)]
        public string UserId { get; set; }
        [StringLength(1)]
        public string UserRole { get; set; }
        [Column(TypeName = "date")]
        public DateTime? LatestPostdate { get; set; }
    }
}
