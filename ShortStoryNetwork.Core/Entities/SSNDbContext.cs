using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ShortStoryNetwork.Core.Entities
{
    public partial class SSNDbContext : DbContext
    {
        public SSNDbContext()
        {
        }

        public SSNDbContext(DbContextOptions<SSNDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<SearchUser> SearchUsers { get; set; }
        public virtual DbSet<StatVowel> StatVowels { get; set; }
        public virtual DbSet<UserInfo> UserInfos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
          
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Post>(entity =>
            {
                entity.Property(e => e.PostId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.UserId).IsFixedLength(true);
            });

            modelBuilder.Entity<SearchUser>(entity =>
            {
                entity.ToView("SearchUser");

                entity.Property(e => e.UserRole)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<StatVowel>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.Property(e => e.UserRole)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
