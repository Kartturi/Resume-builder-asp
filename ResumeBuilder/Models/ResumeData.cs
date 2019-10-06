using System;
using System.Collections.Generic;

namespace ResumeBuilder.Models
{
    public partial class ResumeData
    {
        public ResumeData()
        {
            Education = new HashSet<Education>();
            Language = new HashSet<Language>();
            Links = new HashSet<Links>();
            Projects = new HashSet<Projects>();
            Recommends = new HashSet<Recommends>();
            Skills = new HashSet<Skills>();
            WorkData = new HashSet<WorkData>();
        }

        public int ResumeId { get; set; }
        public string ResumeName { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Profile { get; set; }
        public string ProfileTitle { get; set; }
        public string WorkTitle { get; set; }
        public string EducationTitle { get; set; }
        public string RecommendsTitle { get; set; }
        public string ProjectsTitle { get; set; }
        public string LanguageTitle { get; set; }
        public string SkillsTitle { get; set; }

        public virtual UserData User { get; set; }
        public virtual ICollection<Education> Education { get; set; }
        public virtual ICollection<Language> Language { get; set; }
        public virtual ICollection<Links> Links { get; set; }
        public virtual ICollection<Projects> Projects { get; set; }
        public virtual ICollection<Recommends> Recommends { get; set; }
        public virtual ICollection<Skills> Skills { get; set; }
        public virtual ICollection<WorkData> WorkData { get; set; }
    }
}
