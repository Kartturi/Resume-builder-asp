using System;
using System.Collections.Generic;

namespace ResumeBuilder.Models
{
    public partial class ResumeData
    {
        public ResumeData()
        {
            Links = new HashSet<Links>();
        }

        public int ResumeId { get; set; }
        public string ResumeName { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Profile { get; set; }
        public string ProfileTitle { get; set; }

        public virtual UserData User { get; set; }
        public virtual ICollection<Links> Links { get; set; }
    }
}
