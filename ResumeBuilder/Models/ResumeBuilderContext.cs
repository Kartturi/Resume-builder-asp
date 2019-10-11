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

        public virtual DbSet<Education> Education { get; set; }
        public virtual DbSet<Language> Language { get; set; }
        public virtual DbSet<Links> Links { get; set; }
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<Recommends> Recommends { get; set; }
        public virtual DbSet<ResumeData> ResumeData { get; set; }
        public virtual DbSet<Skills> Skills { get; set; }
        public virtual DbSet<UserData> UserData { get; set; }
        public virtual DbSet<WorkData> WorkData { get; set; }

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
            modelBuilder.Entity<Education>(entity =>
            {
                entity.ToTable("education");

                entity.Property(e => e.EducationId).HasColumnName("educationId");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.Property(e => e.School)
                    .HasColumnName("school")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Time)
                    .HasColumnName("time")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.Education)
                    .HasForeignKey(d => d.ResumeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_education_resumeData");
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.ToTable("language");

                entity.Property(e => e.LanguageId).HasColumnName("languageId");

                entity.Property(e => e.Language1)
                    .HasColumnName("language")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Level)
                    .HasColumnName("level")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.Language)
                    .HasForeignKey(d => d.ResumeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_language_resumeData");
            });

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
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_links_resumeData1");
            });

            modelBuilder.Entity<Projects>(entity =>
            {
                entity.ToTable("projects");

                entity.Property(e => e.ProjectsId).HasColumnName("projectsId");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.Property(e => e.Time)
                    .HasColumnName("time")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.Projects)
                    .HasForeignKey(d => d.ResumeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_projects_resumeData");
            });

            modelBuilder.Entity<Recommends>(entity =>
            {
                entity.ToTable("recommends");

                entity.Property(e => e.RecommendsId).HasColumnName("recommendsId");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NameRecommends)
                    .HasColumnName("nameRecommends")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneRecommends)
                    .HasColumnName("phoneRecommends")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.Recommends)
                    .HasForeignKey(d => d.ResumeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_recommends_resumeData");
            });

            modelBuilder.Entity<ResumeData>(entity =>
            {
                entity.HasKey(e => e.ResumeId);
                entity.ToTable("resumeData");

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.Property(e => e.EducationTitle)
                    .HasColumnName("educationTitle")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LanguageTitle)
                    .HasColumnName("languageTitle")
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

                entity.Property(e => e.ProjectsTitle)
                    .HasColumnName("projectsTitle")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RecommendsTitle)
                    .HasColumnName("recommendsTitle")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeName)
                    .HasColumnName("resumeName")
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.Property(e => e.SkillsTitle)
                    .HasColumnName("skillsTitle")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.WorkTitle)
                    .HasColumnName("workTitle")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ResumeData)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_resumeData_userData");
            });

            modelBuilder.Entity<Skills>(entity =>
            {
                entity.ToTable("skills");

                entity.Property(e => e.SkillsId).HasColumnName("skillsId");

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.ResumeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_skills_resumeData");
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

            modelBuilder.Entity<WorkData>(entity =>
            {
                entity.HasKey(e => e.WorkId);

                entity.ToTable("workData");

                entity.Property(e => e.WorkId).HasColumnName("workId");

                entity.Property(e => e.Company)
                    .HasColumnName("company")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Position)
                    .HasColumnName("position")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResumeId).HasColumnName("resumeId");

                entity.Property(e => e.Time)
                    .HasColumnName("time")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.WorkData)
                    .HasForeignKey(d => d.ResumeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_workData_resumeData");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
