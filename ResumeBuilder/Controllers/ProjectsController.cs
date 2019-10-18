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
    public class ProjectsController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public ProjectsController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Projects>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Projects>> GetProjects(int id)
        {
            var projects = await _context.Projects.FindAsync(id);

            if (projects == null)
            {
                return NotFound();
            }

            return projects;
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjects(int id, Projects projects)
        {
            if (id != projects.ProjectsId)
            {
                return BadRequest();
            }

            _context.Entry(projects).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Projects
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<Projects>> PostProjects(int id, Projects projects)
        {
            _context.Projects.Add(projects);

            await _context.SaveChangesAsync();

            var newProjectsData = await _context.Projects.Where(l => l.ResumeId == id).ToListAsync();

            return Ok(newProjectsData);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Projects>> DeleteProjects(int id)
        {
            var projectsData = await _context.Projects.FindAsync(id);
            if (projectsData == null)
            {
                return NotFound();
            }
            int resumeId = projectsData.ResumeId;
            _context.Projects.Remove(projectsData);
            await _context.SaveChangesAsync();

            return Ok(await _context.Projects.Where(l => l.ResumeId == resumeId).ToListAsync());
        }

        private bool ProjectsExists(int id)
        {
            return _context.Projects.Any(e => e.ProjectsId == id);
        }
    }
}
