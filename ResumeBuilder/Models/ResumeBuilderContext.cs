using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ResumeBuilder.Models
{
    public partial class ResumeBuilderContext : DbContext
    {
        public ResumeBuilderContext()
        {
            
        }

        public ResumeBuilderContext(DbContextOptions<ResumeBuilderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Links> Links { get; set; }
        public virtual DbSet<ResumeData> ResumeData { get; set; }
        public virtual DbSet<UserData> UserData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-VBDBMRL\\SQLEXPRESS;Initial Catalog=ResumeBuilder;Integrated Security=True");
                     
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Links>(entity =>
            {
                entity.HasKey(e => e.LinkId);

                entity.ToTable("links");

                entity.Property(e => e.LinkId).HasColumnName("linkId");

                entity.Property(e => e.Link)
                    .HasColumnName("link")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.Links)
                    .HasForeignKey(d => d.ResumeId)
                    .HasConstraintName("FK_links_resumeData");
            });

            modelBuilder.Entity<ResumeData>(entity =>
            {
                entity.HasKey(e => e.ResumeId);

                entity.ToTable("resumeData");

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Profile)
                    .HasColumnName("profile")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.ProfileTitle)
                    .HasColumnName("profileTitle")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeName)
                    .HasColumnName("resumeName")
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ResumeData)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_resumeData_userData");
            });

            modelBuilder.Entity<UserData>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("userData");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.UserName)
                    .HasColumnName("userName")
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
