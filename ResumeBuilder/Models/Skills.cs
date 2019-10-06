using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace ResumeBuilder.Models
{
    public partial class Skills
    {
        public int SkillsId { get; set; }
        public string Name { get; set; }
        public int? Level { get; set; }
        public int ResumeId { get; set; }
        [JsonIgnore]
        public virtual ResumeData Resume { get; set; }
    }
}
