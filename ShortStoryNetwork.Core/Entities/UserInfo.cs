using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ShortStoryNetwork.Core.Entities
{
    [Table("UserInfo")]
    public partial class UserInfo
    {
        [Key]
        [StringLength(12)]
        public string UserId { get; set; }
        [Required]
        [StringLength(20)]
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [StringLength(320)]
        public string EmailAddress { get; set; }
        [StringLength(1)]
        public string UserRole { get; set; }
        public bool? IsEditor { get; set; }
        public bool? IsBanned { get; set; }
    }
}
