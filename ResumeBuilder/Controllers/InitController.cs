using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;

namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InitController : ControllerBase
    {

        private readonly ResumeBuilderContext _context;

        public InitController(ResumeBuilderContext context)
        {
            _context = context;
        }

        //api/init
        [HttpPost]
        public IActionResult initData()
        {
            //get json data
            using (var reader = new StreamReader(Request.Body))
            {
                
                return Ok("");
                // Do something
            }

            

        }







    }
}
