using System;
using System.Collections.Generic;
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

        //api/init/test
        [HttpGet]
        public IActionResult initData()
        {
            var resumes = _context.ResumeData.Where(s => s.ResumeId == 30)
                .Include(s => s.Links)
                .Include(w => w.WorkData)
                .ToList();

            return Ok(resumes);

        }







    }
}
