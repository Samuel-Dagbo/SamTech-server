import ContactMessage from "../Models/ContactMessage.js";
import Profile from "../Models/Profile.js";
import Project from "../Models/Project.js";
import Service from "../Models/Service.js";
import Testimonial from "../Models/Testimonial.js";

function generateSlug(title) {
  if (!title || typeof title !== 'string') {
    return `project-${Date.now()}`;
  }
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || `project-${Date.now()}`;
}

export async function getProfile(_req, res) {
  const profile = await Profile.findOne().sort({ createdAt: -1 });
  res.json({ data: profile });
}

export async function upsertProfile(req, res) {
  const existing = await Profile.findOne();
  const profile = existing
    ? await Profile.findByIdAndUpdate(existing._id, req.body, { new: true, runValidators: true })
    : await Profile.create(req.body);

  res.json({ data: profile, message: "Profile saved" });
}

export async function getProjects(_req, res) {
  const projects = await Project.find().sort({ order: 1, featured: -1, createdAt: -1 });
  res.json({ data: projects });
}

export async function cleanupProjects(_req, res) {
  try {
    // Find all projects with empty slugs
    const emptySlugProjects = await Project.find({ $or: [{ slug: "" }, { slug: null }, { slug: { $exists: false } }] });
    
    if (emptySlugProjects.length === 0) {
      return res.json({ message: "No projects with empty slugs found" });
    }
    
    // Update each project with a generated slug
    for (const project of emptySlugProjects) {
      const newSlug = generateSlug(project.title);
      await Project.findByIdAndUpdate(project._id, { slug: newSlug });
    }
    
    res.json({ message: `Updated ${emptySlugProjects.length} projects with generated slugs` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProject(req, res) {
  try {
    // Generate slug if not provided or empty
    const projectData = { ...req.body };
    if (!projectData.slug || projectData.slug.trim() === '') {
      projectData.slug = generateSlug(projectData.title);
    }
    
    const project = await Project.create(projectData);
    res.status(201).json({ data: project, message: "Project created" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate slug by generating a unique one
      const uniqueSlug = `${generateSlug(req.body.title)}-${Date.now()}`;
      const project = await Project.create({ ...req.body, slug: uniqueSlug });
      return res.status(201).json({ data: project, message: "Project created" });
    }
    throw error;
  }
}

export async function updateProject(req, res) {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json({ data: project, message: "Project updated" });
}

export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json({ message: "Project deleted" });
}

export async function getTestimonials(_req, res) {
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  res.json({ data: testimonials });
}

export async function getServices(_req, res) {
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  res.json({ data: services });
}

export async function getProjectBySlug(req, res) {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json({ data: project });
}

export async function createTestimonial(req, res) {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ data: testimonial, message: "Testimonial created" });
}

export async function updateTestimonial(req, res) {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found" });
  }

  res.json({ data: testimonial, message: "Testimonial updated" });
}

export async function deleteTestimonial(req, res) {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found" });
  }

  res.json({ message: "Testimonial deleted" });
}

export async function createService(req, res) {
  const service = await Service.create(req.body);
  res.status(201).json({ data: service, message: "Service created" });
}

export async function updateService(req, res) {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.json({ data: service, message: "Service updated" });
}

export async function deleteService(req, res) {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.json({ message: "Service deleted" });
}

export async function createContactMessage(req, res) {
  const contactMessage = await ContactMessage.create(req.body);
  res.status(201).json({ data: contactMessage, message: "Message received" });
}

export async function getContactMessages(_req, res) {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ data: messages });
}

export async function updateContactMessage(req, res) {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.json({ data: message, message: "Message updated" });
}

export async function deleteContactMessage(req, res) {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.json({ message: "Message deleted" });
}
