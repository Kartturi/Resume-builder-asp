using System;
using System.Collections.Generic;

namespace ResumeBuilder.Models
{
    public partial class Links
    {
        public int LinkId { get; set; }
        public string Link { get; set; }
        
        public int? ResumeId { get; set; }

        public virtual ResumeData Resume { get; set; }
    }
}
