using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeBuilder.utils
{
    public class CreateResumeHtml
    {
        private string _html = "<h1>This is a default</h1>";

        public string html { 
            get { return _html; }
            set { _html = value; }
        }

        public string getHtml()
        {
            return this._html;
        }

        public string getReactHtml(int resumeId, int userId)
        {
             string newHtml = "<h1>This is a default where userId:" +
                 + userId +  " and resumeId is: " + resumeId + " </h1>";
            return newHtml;
        }

        
    }
}
