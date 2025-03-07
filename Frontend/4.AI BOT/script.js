document.getElementById("sendButton").addEventListener("click", sendMessage);

document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sendMessage();
    }
});


function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();

    if (userInput === "") return; 

    displayMessage(userInput, "user");


    setTimeout(() => {
        processUserInput(userInput.toLowerCase());
    }, 1000);

    document.getElementById("userInput").value = ""; 
}


function displayMessage(message, sender) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function processUserInput(input) {
    
}


let lastCategory = "";

function processUserInput(input) {
    const greetings = ["hi", "hello", "good morning", "good afternoon", "good evening", "good night"];
    const gratitudeResponses = ["thank you", "thanks", "thank you so much"];
    const farewellResponses = ["bye", "goodbye", "see you", "take care"];
    const yesResponses = ["yes", "yeah", "sure", "ok", "okay"];
    const noResponses = ["no", "not now", "maybe later"];

    if (greetings.includes(input)) {
        displayMessage("Hi there! 😊 I'm here to support you. How are you feeling today?", "bot");
        return;
    }

    if (gratitudeResponses.includes(input)) {
        displayMessage("You're welcome! I'm glad I could help. Remember, I'm always here whenever you need me. 💙", "bot");
        return;
    }

    if (farewellResponses.includes(input)) {
        displayMessage("Goodbye! Take care and stay strong. I'm always here if you need to talk. 💜", "bot");
        return;
    }

    if (yesResponses.includes(input)) {
        if (lastCategory) {
            displaySuggestions(lastCategory);
            return;
        }
        displayMessage("Could you share more about how you're feeling? I'm here to help.", "bot");
        return;
    }

    if (noResponses.includes(input)) {
        displayMessage("That's okay. If you ever want to chat, I'll be right here. 😊", "bot");
        return;
    }


    lastCategory = determineCategory(input);

    if (lastCategory) {
        displayMessage(generateCategoryResponse(lastCategory), "bot");
    } else {
        displayMessage("I'm here to help. Could you tell me a bit more about how you're feeling?", "bot");
    }
}


function determineCategory(input) {
    const categories = {
        sad: ["sad", "unhappy", "down", "blue"],
        happy:["happy","good","happiness"],
        anxious: ["anxious", "worried", "nervous"],
        grief: ["grief", "loss", "lost someone", "mourning"],
        stressed: ["stressed", "pressure", "overwhelmed"],
        motivation: ["motivation", "unmotivated", "discouraged"],
        productivity: ["productive", "lazy", "procrastination"],
        selfesteem: ["self esteem", "confidence", "self-worth"],
        forgiveness: ["forgiveness", "resentment", "letting go"],
        burnout: ["burnout", "exhausted", "fatigue" , "tired"],
        fear: ["fear", "afraid", "scared"],
        anger: ["anger", "angry", "frustrated"],
        gratitude: ["gratitude", "thankful", "grateful"],
        mindfulness: ["mindfulness", "focus", "present moment"],
        selflove: ["self love", "love myself"],
        journaling: ["journaling", "writing"],
        affirmation: ["affirmation", "positive thinking"],
        happiness: ["happiness", "joy", "content"],
        excitement:["excitement"]
    };

    for (const category in categories) {
        if (categories[category].some(word => input.includes(word))) {
            return category;
        }
    }

    return null;
}

function generateCategoryResponse(category) {
    const responses = {
        sad: 
            "I'm really sorry to hear that you're feeling sad. It's completely okay to feel this way sometimes. " +
            "Would you like some tips to help you feel a little better, or maybe just talk about it? I'm here for you. 😊",
        
        happy: "Its nice to hear that you are feeling good and haapy . Its very fullfilling to feel these emotions as they bring goodness in our life ." +
                "Would you love to share why are you happy or do you want some tips to feel more happy ?",

        anxious: 
            "Feeling anxious can be so overwhelming. Remember, you're not alone in this. Would you like to try some " +
            "calming techniques, or talk about what's making you feel this way? Whatever you need, I'm here to help.",

        stressed: 
            "Stress can be incredibly draining, but you don't have to face it alone. Would you like some practical " +
            "ideas to help you unwind and manage stress better? Let's take it one step at a time together.",

        trauma: 
            "I'm deeply sorry you're experiencing feelings related to trauma. It's a heavy burden to carry, but reaching " +
            "out is a courageous first step. Would you like some suggestions on coping strategies or ways to seek support?",

        motivation: 
            "It’s normal to feel unmotivated sometimes, especially when things feel overwhelming. Would you like some " +
            "ideas or tips to help rekindle your motivation and regain your focus? Let's tackle this together.",

        overwhelmed: 
            "Feeling overwhelmed can make it hard to see the path forward. It's okay to feel this way, and you're not " +
            "alone. Would you like tips on breaking things down into smaller, manageable steps? I'm here to support you.",

        lonely: 
            "Loneliness can be such a heavy feeling, but please know you're not alone. Would you like to explore ways " +
            "to feel more connected with others or activities that might help brighten your day?",

        hopeless: 
            "I'm so sorry you're feeling hopeless right now. It's tough to carry that weight. Would you like to talk " +
            "about it or explore some ways to regain a sense of hope? I'm here to listen and support you.",

        burnout: 
            "Burnout is a sign that you've been pushing yourself too hard. It’s okay to take a step back and focus on " +
            "yourself. Would you like some tips to recharge and find balance again? You’re doing the best you can.",

        gratitude: 
            "Practicing gratitude can really help shift our perspective. Would you like some ideas to get started on " +
            "focusing on the positive moments, no matter how small? I'm here to guide you.",

        selfcare: 
            "Self-care is so important, and you deserve to prioritize yourself. Would you like suggestions on simple " +
            "but effective ways to take care of your mental and physical well-being today?",

        selfesteem: 
            "Low self-esteem can be really challenging, but it doesn't define you. Would you like to explore strategies " +
            "to build your confidence and recognize your unique strengths? You’re more capable than you think.",

        selflove: 
            "Self-love is a journey that takes time and patience. It's okay to struggle with it, but I'm here to help. " +
            "Would you like to explore ways to practice self-compassion and nurture a positive relationship with yourself?",

        anger: 
            "Anger is a natural emotion, but it can feel overwhelming. Would you like some suggestions to help you " +
            "manage your anger in a healthy way? Let's work on turning those emotions into something constructive.",

        fear: 
            "Fear can be so paralyzing at times, but facing it is a brave step forward. Would you like some techniques " +
            "to feel safer and more grounded when you're afraid? You're stronger than you realize.",

        worry: 
            "Worry can weigh on our minds, making it hard to focus on anything else. Would you like tips to calm " +
            "those racing thoughts and bring more peace to your day?",

        mindfulness: 
            "Mindfulness is a wonderful way to stay present and grounded. Would you like guidance on how to practice " +
            "mindfulness in your daily life? Let's explore this together.",

        journaling: 
            "Journaling is a great way to process thoughts and emotions. Would you like tips on how to start or prompts " +
            "that can help you reflect and gain clarity?",

        affirmation: 
            "Positive affirmations can really help shift your mindset and boost your confidence. Would you like some " +
            "examples or tips to create affirmations that resonate with you?",

        therapy: 
            "Seeking therapy is a brave and empowering step toward healing. Would you like resources to explore therapy " +
            "options or tips on how to find the right therapist?",

        selfreflection: 
            "Self-reflection is a powerful tool for personal growth. Would you like ideas or prompts to help you get " +
            "started on reflecting in a meaningful way?",

        resilience: 
            "Building resilience takes time, but it’s so worth it. Would you like suggestions on how to strengthen your " +
            "ability to bounce back from challenges? You’ve got this.",

        happiness: 
            "Happiness is such a beautiful thing to seek. Would you like ideas to bring more joy into your life or " +
            "celebrate the happy moments you already have?",

        relationship: 
            "Relationships can be complex but deeply rewarding. Would you like advice on building stronger connections " +
            "or navigating challenges in your relationship?",

        friendship: 
            "Friendships are a valuable part of life. Would you like tips on strengthening your friendships or making " +
            "new ones? Let's work on fostering meaningful connections.",

        family: 
            "Family dynamics can be both rewarding and challenging. Would you like guidance on improving communication " +
            "or resolving conflicts within your family?",

        workout: 
            "Exercise is great for both mental and physical health. Would you like some workout suggestions or tips to " +
            "stay motivated and make fitness fun?",
        excitement:"Excitement is a burst of energy and joy that can inspire and motivate you. It’s a great feeling, but it can also feel overwhelming. Let’s explore ways to channel that energy effectively and enjoy the moment fully!"
    };

    return responses[category] || 
           "I'm here to help and support you. Could you tell me more about how you're feeling or what you're going through? " +
           "Let’s work through this together.";
}

function displaySuggestions(category) {
    const suggestions = {
        sad: [
            "Take a walk in nature to clear your mind.",
            "Listen to some uplifting music or your favorite playlist.",
            "Write down three things you're grateful for today.",
            "Call or text a friend to share how you feel.",
            "Watch a comforting or funny show to lift your mood."
        ],
        anxious: [
            "Practice deep breathing: Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds.",
            "Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you can smell, and 1 you can taste.",
            "Meditate for a few minutes or do some light yoga stretches.",
            "Write down your worries and challenge them with positive affirmations.",
            "Limit your screen time and disconnect from social media for a while."
        ],
        stressed: [
            "Break tasks into smaller, manageable steps.",
            "Take short, regular breaks during your day to recharge.",
            "Stay hydrated and eat balanced meals to support your body.",
            "Practice relaxation techniques like progressive muscle relaxation.",
            "Talk to someone you trust about what’s causing your stress."
        ],
        overwhelmed: [
            "Write down all your tasks and prioritize them.",
            "Focus on completing one small task at a time.",
            "Take a moment to breathe deeply and reset your focus.",
            "Set boundaries and say no to tasks that you cannot handle right now.",
            "Listen to calming music or take a walk to clear your head."
        ],
        burnout: [
            "Set boundaries to protect your personal time and energy.",
            "Get plenty of rest and prioritize your sleep schedule.",
            "Engage in activities that you enjoy or find relaxing.",
            "Delegate or postpone non-urgent tasks to reduce your workload.",
            "Consider reaching out for support from a friend, family member, or therapist."
        ],
        lonely: [
            "Call or text a friend or family member to check in.\n+",
            "Join a local or online community based on your interests or hobbies.",
            "Spend time with a pet or consider adopting one if you can.",
            "Engage in creative hobbies like painting, writing, or crafting.",
            "Volunteer for a cause you care about to connect with others."
        ],
        hopeless: [
            "Focus on small, positive steps you can take today.",
            "Set one small goal that you can easily achieve.",
            "Remind yourself that feelings of hopelessness can pass with time.",
            "Seek support from friends, family, or a professional if needed.",
            "Reflect on past times when you overcame challenges."
        ],
        motivation: [
            "Set small, achievable goals and celebrate each step.",
            "Take a break to do something that brings you joy.",
            "Reach out to a friend or family member for some encouragement.",
            "Write down your goals and keep them visible to remind you of your purpose.",
            "Start with one small action to get moving and build momentum."
        ],
        selfcare: [
            "Take a relaxing bath with your favorite essential oils or bath salts.",
            "Read a book or watch a movie that inspires you.",
            "Practice mindfulness or meditation for 10 minutes.",
            "Take a power nap to recharge your energy.",
            "Make yourself a cup of tea and unwind."
        ],
        selfesteem: [
            "Practice positive affirmations daily to boost your self-worth.",
            "Write down your strengths and achievements.",
            "Take care of your body with exercise, nutrition, and rest.",
            "Do something kind for yourself, like treating yourself to something small you enjoy.",
            "Surround yourself with people who support and uplift you."
        ],
        selflove: [
            "Write a love letter to yourself, celebrating your strengths and accomplishments.",
            "Take a long bath or indulge in a beauty treatment.",
            "Spend time in nature to reconnect with yourself.",
            "Do something creative that makes you feel proud of yourself.",
            "Read books or articles that affirm your self-worth."
        ],
        anger: [
            "Practice deep breathing or progressive muscle relaxation.",
            "Write down your feelings to process your anger.",
            "Go for a walk or do some light exercise to release pent-up energy.",
            "Try mindfulness or meditation to calm your mind.",
            "Talk to a trusted friend or therapist to express your feelings."
        ],
        fear: [
            "Write down your fears and break them into manageable steps.",
            "Practice grounding techniques like 5-4-3-2-1.",
            "Visualize a positive outcome to your fears.",
            "Read a self-help book or article on overcoming fear.",
            "Talk to a therapist or support group about your fears."
        ],
        worry: [
            "Write down your worries and focus on what you can control.",
            "Practice deep breathing or mindfulness to calm your mind.",
            "Reach out to a friend or loved one for support.",
            "Try focusing on solutions, rather than the problem itself.",
            "Set aside time each day to focus on your worries and let go during other moments."
        ],
        mindfulness: [
            "Practice mindful breathing for 5 minutes.",
            "Spend time in nature and focus on the present moment.",
            "Try mindful stretching or yoga.",
            "Keep a mindfulness journal to track your thoughts and feelings.",
            "Listen to calming sounds or meditation music."
        ],
        journaling: [
            "Write down your thoughts and emotions without judgment.",
            "Keep a gratitude journal to focus on the positive.",
            "Reflect on your day and write about your experiences.",
            "Explore prompts for self-discovery and growth.",
            "Keep a journal for long-term reflection on your personal journey."
        ],
        affirmation: [
            "Practice daily affirmations like 'I am worthy,' 'I am enough,' or 'I am capable.'",
            "Write down positive affirmations and keep them visible.",
            "Say something kind to yourself every day.",
            "Focus on affirmations that challenge your negative thoughts.",
            "Use affirmations as a tool to shift your mindset."
        ],
        therapy: [
            "Seek a professional therapist or counselor for personalized support.",
            "Explore online therapy options for convenience.",
            "Read about different types of therapy (CBT, DBT, etc.) to find the best fit for you.",
            "Start with a consultation to discuss your concerns and goals.",
            "Look for group therapy or support groups in your community."
        ],
        selfreflection: [
            "Take time each week to reflect on your thoughts, actions, and growth.",
            "Ask yourself open-ended questions like 'What have I learned?' or 'What could I improve?'",
            "Journal about your past experiences and their lessons.",
            "Meditate on your goals and values.",
            "Set aside time for deep reflection on your life purpose and direction."
        ],
        resilience: [
            " Focus on building mental and emotional strength through self-care.",
            " Break down challenges into manageable steps to prevent overwhelm.",
            " Practice mindfulness to stay grounded in difficult times.",
            " Read books or watch talks on resilience to inspire you.",
            " Lean on supportive people and reach out when you need help."
        ],
        happiness: [
            " Practice gratitude by writing down things you're thankful for each day.",
            " Spend time in nature or with loved ones.",
            " Listen to uplifting music that makes you feel happy.",
            " Set small, achievable goals that bring you joy.",
            " Read books or watch content that inspires positivity."
        ],
        achievement: [
            " Break large goals into smaller, achievable tasks.",
            " Celebrate every small victory along the way.",
            " Keep a record of your accomplishments to track progress.",
            " Take a moment to reflect on how far you've come.",
            " Reach out to a friend or mentor for encouragement."
        ],
        excitement: [
            "Channel your excitement into action by starting something new.",
            "Engage in creative projects that fuel your enthusiasm.",
            "Dance or do something physical to release your energy.",
            "Share your excitement with someone who can join in your joy.",
            "Plan an exciting event or activity to look forward to."
        ]
        
    };

    const links = {
        journaling: "Explore helpful journaling prompts [here](https://bit.ly/journaling-prompts).",
        meditation: "Learn quick meditation techniques [here](https://bit.ly/meditation-guide).",
        workout: "Find fun workouts to stay motivated [here](https://bit.ly/workout-plans).",
        therapy: "Locate therapists near you [here](https://www.psychologytoday.com).",
        affirmation: "Check this affirmations out [here] (/Frontend/Affirmation/index.html)."
    };

    const tips = suggestions[category];
        const resource = links[category] || ".";

        if (tips) {
            let formattedTips = tips.map(tip => `- ${tip}`).join("\n");
            displayMessage(
                `Here are some tips that might help you:\n\n${formattedTips}\n\n${resource}`,
                "bot"
            );
        } else {
            displayMessage(
                `I'm glad to support you. Here's something that might help: ${resource}`,
                "bot"
            );
        }
    }

    
