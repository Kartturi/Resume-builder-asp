using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace ResumeBuilder.Models
{
    public partial class Projects
    {
        public int ProjectsId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Time { get; set; }
        public int ResumeId { get; set; }
        [JsonIgnore]
        public virtual ResumeData Resume { get; set; }
    }
}
