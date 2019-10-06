using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ResumeBuilder.Models
{
    public partial class Education
    {
        public int EducationId { get; set; }
        public string School { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public int ResumeId { get; set; }
        [JsonIgnore]
        public virtual ResumeData Resume { get; set; }
    }
}
