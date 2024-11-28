import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
    const testimonials = [
        {
            quote:
                "I’ve been using this platform for months, and it has transformed the way I park. Finding a spot is easy, the interface is user-friendly, and booking ahead saves so much time. Even in crowded city centers, I never worry about parking anymore. Highly recommend it to frequent travelers!",
            name: "Sarah Chen",
            designation: "Product Manager at TechFlow",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "The concept is great, and I was able to find parking near my destination quickly. However, the app occasionally glitches during the payment process, which can be frustrating. Overall, it’s a convenient service but could use some technical improvements.",
            name: "Michael Rodriguez",
            designation: "CTO at InnovateSphere",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "It’s an okay service. It worked well in some areas, but in smaller towns, the availability of parking spots was limited. For major cities, it’s super reliable, but expanding the network would make it more useful for travelers like me who go off the beaten path.",
            name: "Emily Watson",
            designation: "Operations Director at CloudScale",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "I tried booking a space, but the location I chose was already occupied when I arrived. The support team was polite but couldn’t resolve my issue on time. It’s a good idea, but there’s a gap between the system and real-time updates. Hope they improve this soon!",
            name: "James Kim",
            designation: "Engineering Lead at DataPro",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Fantastic service! I was driving to an unfamiliar city and found a secure parking spot within minutes. The directions were accurate, and the staff at the parking lot were helpful. It’s a game-changer for anyone who hates the hassle of finding parking manually.",
            name: "Lisa Thompson",
            designation: "VP of Technology at FutureNet",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];
    return <AnimatedTestimonials testimonials={testimonials} />;
}
