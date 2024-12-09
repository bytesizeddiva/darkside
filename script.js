const terminal = document.querySelector('.terminal-content');
const TOTAL_QUESTIONS = 5;
let currentQuestion = 0;
let conversationHistory = [];
let isGeneratingQuestion = false;

// Initialize the terminal and show welcome screen
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeScreen();
});

function showWelcomeScreen() {
    terminal.innerHTML = ''; // Clear terminal
    const container = document.createElement('div');
    container.className = 'welcome-container';
    container.style.textAlign = 'center';

    // Add dramatic ASCII art
    const asciiArt = document.createElement('pre');
    asciiArt.className = 'ascii-art';
    asciiArt.style.color = '#ff0000';
    asciiArt.style.marginBottom = '20px';
    asciiArt.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
    asciiArt.innerHTML = `
 ██▄   ██   █▄▄▄▄ █  █▀  ▄▄▄▄▄   ▄█ ██▄   ▄███▄   
█  █  █ █  █  ▄▀ █▄█   █     ▀▄ ██ █  █  █▀   ▀  
█   █ █▄▄█ █▀▀▌  █▀▄ ▄  ▀▀▀▀▄   ██ █   █ ██▄▄    
█  █  █  █ █  █  █  █ ▀▄▄▄▄▀    ▐█ █  █  █▄   ▄▀ 
███▀     █   █     █             ▐ ███▀  ▀███▀   
        █   ▀     ▀                              
       ▀                                         
    `;
    container.appendChild(asciiArt);

    // Add subtitle
    const subtitle = document.createElement('div');
    subtitle.className = 'welcome-subtitle';
    subtitle.style.color = '#00ff00';
    subtitle.style.fontSize = '24px';
    subtitle.style.marginBottom = '30px';
    subtitle.textContent = "IDENTITY ANALYZER v2.0";
    container.appendChild(subtitle);

    // Add description
    const descDiv = document.createElement('div');
    descDiv.className = 'welcome-description';
    descDiv.style.color = '#00ffff';
    descDiv.style.marginBottom = '30px';
    descDiv.innerHTML = `
        <div style="font-size: 18px; margin-bottom: 20px;">
            INITIATING VILLAIN ANALYSIS PROTOCOL...
        </div>
        <div style="color: #888; margin-bottom: 20px;">
            ⚠️ WARNING: This analysis will reveal your darkest potential ⚠️
        </div>
        <div style="color: #ff9900;">
            ${TOTAL_QUESTIONS} questions stand between you and your true villain identity.<br>
            Choose wisely. Your destiny awaits.
        </div>
    `;
    container.appendChild(descDiv);

    // Add start button
    const startButton = document.createElement('div');
    startButton.className = 'start-button';
    startButton.style.color = '#ff0000';
    startButton.style.cursor = 'pointer';
    startButton.style.border = '2px solid #ff0000';
    startButton.style.padding = '15px 30px';
    startButton.style.display = 'inline-block';
    startButton.style.marginTop = '30px';
    startButton.innerHTML = '[ PRESS ANY KEY TO BEGIN ]';
    container.appendChild(startButton);

    terminal.appendChild(container);

    // Start quiz on any key press
    const handleStart = () => {
        document.removeEventListener('keydown', handleStart);
        startQuiz();
    };
    document.addEventListener('keydown', handleStart);
}

async function startQuiz() {
    terminal.innerHTML = ''; // Clear terminal
    currentQuestion = 0;
    conversationHistory = [];
    await generateQuestion();
}

async function generateQuestion() {
    if (isGeneratingQuestion) return;
    isGeneratingQuestion = true;

    try {
        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        questionContainer.style.marginBottom = '20px';

        const questionNumber = document.createElement('div');
        questionNumber.style.color = '#00ff00';
        questionNumber.style.marginBottom = '10px';
        questionNumber.textContent = `Question ${currentQuestion + 1}/${TOTAL_QUESTIONS}:`;
        questionContainer.appendChild(questionNumber);

        let currentChoices = [];

        if (currentQuestion === 0) {
            const welcomeText = `Welcome, dear candidates, to the labyrinthine path of villainy! Here at the Legion of Doom, we seek only those with the cunning, ambition, and flair for the dramatic.

Before we delve into the depths of your dark potential, let me share a little disclaimer: *we are not responsible for any sudden urges to take over the world or, indeed, any smaller entities you might have*—mwahaha!

Now, let's begin with a question that will set the tone for your journey among us...

The world is full of injustices, how do you choose to address them?`;

            currentChoices = [
                "By becoming a puppet master, manipulating events from the shadows to ensure my idea of justice prevails.",
                "Through chaos and anarchy, throwing everything into disarray to reset the world in my image.",
                "With superior intellect and technology, devising solutions and using my gadgets to enforce my vision of order.",
                "By exploiting the system, using legal loopholes and corporate power to bend the world to my will."
            ];

            // Display welcome text with typewriter effect
            const welcomeDiv = document.createElement('div');
            welcomeDiv.style.color = '#00ffff';
            welcomeDiv.style.whiteSpace = 'pre-wrap';
            welcomeDiv.style.marginBottom = '20px';
            questionContainer.appendChild(welcomeDiv);

            // Add text with typewriter effect
            terminal.appendChild(questionContainer);
            await typewriterEffect(welcomeDiv, welcomeText, 30);

            // Display choices
            currentChoices.forEach((choice, index) => {
                const choiceDiv = document.createElement('div');
                choiceDiv.className = 'choice';
                choiceDiv.style.marginBottom = '10px';
                choiceDiv.style.cursor = 'pointer';
                choiceDiv.style.transition = 'all 0.3s ease';
                choiceDiv.style.opacity = '0';
                
                const letter = String.fromCharCode(65 + index);
                choiceDiv.innerHTML = `<span style="color: #00ff00">${letter}</span>) <span style="color: #e0e0e0">${choice}</span>`;
                
                // Hover effect
                choiceDiv.addEventListener('mouseover', () => {
                    choiceDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                    choiceDiv.style.transform = 'translateX(10px)';
                });
                choiceDiv.addEventListener('mouseout', () => {
                    choiceDiv.style.backgroundColor = 'transparent';
                    choiceDiv.style.transform = 'translateX(0)';
                });
                
                questionContainer.appendChild(choiceDiv);

                // Fade in effect for choices
                setTimeout(() => {
                    choiceDiv.style.transition = 'opacity 0.5s ease';
                    choiceDiv.style.opacity = '1';
                }, index * 200);
            });

            // Add dramatic closing line
            const closingDiv = document.createElement('div');
            closingDiv.style.color = '#ff0000';
            closingDiv.style.marginTop = '20px';
            closingDiv.style.fontStyle = 'italic';
            closingDiv.opacity = '0';
            closingDiv.textContent = 'Prepare yourself, for your choice will reveal the seeds of your villainy! Mwahahaha!';
            questionContainer.appendChild(closingDiv);

            // Fade in closing line
            setTimeout(() => {
                closingDiv.style.transition = 'opacity 0.5s ease';
                closingDiv.style.opacity = '1';
            }, 1000);

        } else {
            const loadingDiv = document.createElement('div');
            loadingDiv.style.color = '#00ffff';
            questionContainer.appendChild(loadingDiv);
            terminal.appendChild(questionContainer);

            // Scroll to the new question immediately
            questionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Type out "Analyzing your villainous potential" first
            const baseText = "Analyzing your villainous potential";
            for (let i = 0; i < baseText.length; i++) {
                loadingDiv.textContent += baseText[i];
                await new Promise(resolve => setTimeout(resolve, 30));
            }

            // Start the dot animation
            let isLoading = true;
            const animateDots = async () => {
                while (isLoading) {
                    for (let dots = 0; dots <= 3; dots++) {
                        if (!isLoading) break;
                        loadingDiv.textContent = baseText + '.'.repeat(dots);
                        await new Promise(resolve => setTimeout(resolve, 200));
                    }
                }
            };

            // Start dot animation
            const dotAnimation = animateDots();

            // Get question from AI
            const response = await callXAI(
                "Generate the next villain analysis question based on previous answers.",
                conversationHistory
            );

            // Stop the dot animation
            isLoading = false;
            await dotAnimation;

            // Remove loading indicator
            loadingDiv.remove();

            // Display question
            const questionText = document.createElement('div');
            questionText.style.color = '#00ffff';
            questionText.style.marginBottom = '20px';
            questionText.style.whiteSpace = 'pre-wrap';
            questionText.textContent = response.question;
            questionContainer.appendChild(questionText);

            currentChoices = response.choices;

            // Display choices
            currentChoices.forEach((choice, index) => {
                const choiceDiv = document.createElement('div');
                choiceDiv.className = 'choice';
                choiceDiv.style.marginBottom = '10px';
                choiceDiv.style.cursor = 'pointer';
                choiceDiv.style.transition = 'all 0.3s ease';
                
                const letter = String.fromCharCode(65 + index);
                choiceDiv.innerHTML = `<span style="color: #00ff00">${letter}</span>) <span style="color: #e0e0e0">${choice}</span>`;
                
                // Hover effect
                choiceDiv.addEventListener('mouseover', () => {
                    choiceDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                    choiceDiv.style.transform = 'translateX(10px)';
                });
                choiceDiv.addEventListener('mouseout', () => {
                    choiceDiv.style.backgroundColor = 'transparent';
                    choiceDiv.style.transform = 'translateX(0)';
                });
                
                questionContainer.appendChild(choiceDiv);
            });

            // Scroll again after content is added
            setTimeout(() => {
                questionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        // Add input prompt
        const promptDiv = document.createElement('div');
        promptDiv.style.color = '#00ff00';
        promptDiv.style.marginTop = '20px';
        promptDiv.innerHTML = '> Type A-D to select: <span class="blink">█</span>';
        questionContainer.appendChild(promptDiv);

        // Handle answer selection
        const handleAnswer = async (event) => {
            // Prevent backspace from navigating back
            if (event.key === 'Backspace') {
                event.preventDefault();
                return;
            }

            const key = event.key.toUpperCase();
            
            // Only process A, B, C, D keys
            if (['A', 'B', 'C', 'D'].includes(key)) {
                const index = key.charCodeAt(0) - 65;
                if (index < currentChoices.length) {
                    // Remove event listener immediately to prevent double-input
                    document.removeEventListener('keydown', handleAnswer);
                    
                    // Show selection
                    promptDiv.innerHTML = `> Selected: ${key}`;
                    
                    // Highlight selected choice
                    const choices = questionContainer.querySelectorAll('.choice');
                    choices.forEach(choice => {
                        choice.style.backgroundColor = 'transparent';
                        choice.style.color = '#e0e0e0';
                    });
                    choices[index].style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                    choices[index].style.color = '#00ff00';
                    
                    // Store answer
                    conversationHistory.push(currentChoices[index]);
                    
                    // Wait a moment for visual feedback
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Move to next question or show results
                    currentQuestion++;
                    if (currentQuestion < TOTAL_QUESTIONS) {
                        await generateQuestion();
                    } else {
                        await showResults();
                    }
                }
            } else if (key !== 'BACKSPACE') {
                // Show error message for invalid keys (except backspace)
                const errorDiv = document.createElement('div');
                errorDiv.style.color = '#ff0000';
                errorDiv.style.marginTop = '10px';
                errorDiv.textContent = 'Please press A, B, C, or D to make your choice...';
                
                // Remove any existing error message
                const existingError = questionContainer.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                errorDiv.className = 'error-message';
                questionContainer.appendChild(errorDiv);
                
                // Remove error message after 2 seconds
                setTimeout(() => {
                    if (errorDiv.parentNode === questionContainer) {
                        errorDiv.remove();
                    }
                }, 2000);
            }
        };

        document.addEventListener('keydown', handleAnswer);
        isGeneratingQuestion = false;

    } catch (error) {
        console.error('Error generating question:', error);
        isGeneratingQuestion = false;
    }
}

async function showResults() {
    try {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container';
        resultsContainer.style.marginTop = '20px';
        terminal.appendChild(resultsContainer);

        // Show loading sequence first
        const loadingDiv = document.createElement('div');
        loadingDiv.style.color = '#00ff00';
        resultsContainer.appendChild(loadingDiv);

        // Loading messages sequence with typewriter and scroll
        const messages = [
            "INITIATING FINAL ANALYSIS PROTOCOL",
            "PROCESSING VILLAINOUS CHOICES",
            "CALCULATING EVIL QUOTIENT",
            "MATCHING VILLAIN ARCHETYPES",
            "PREPARING FINAL ASSESSMENT"
        ];

        // Show each message with typewriter and dots animation
        for (let i = 0; i < messages.length; i++) {
            loadingDiv.textContent = '';
            
            // Type out the message
            for (let char = 0; char < messages[i].length; char++) {
                loadingDiv.textContent += messages[i][char];
                loadingDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
                await new Promise(resolve => setTimeout(resolve, 30));
            }

            // Add animated dots
            for (let j = 0; j < 3; j++) {
                await new Promise(resolve => setTimeout(resolve, 200));
                loadingDiv.textContent = messages[i] + '.'.repeat(j + 1);
                loadingDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }

            await new Promise(resolve => setTimeout(resolve, 200));

            // Fade out effect for transition
            for (let opacity = 100; opacity >= 0; opacity -= 20) {
                loadingDiv.style.opacity = opacity / 100;
                await new Promise(resolve => setTimeout(resolve, 30));
            }

            loadingDiv.style.opacity = 1;
        }

        // Get analysis from AI
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xai-lD4IT6ImSUbqCuOafg3TbmVKZYcozR2s1EoFW49WXqt7s739KbED6Ks1AgqTSjiToUjgmIm2ozXpm2Ao'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "You are a supervillain personality analyzer. Based on the user's answers, determine which famous comic book villain they most closely resemble. Format your response in three parts: 1) ANALYSIS COMPLETE: [Villain Name], 2) A dramatic one-line revelation, 3) A detailed 2-3 sentence explanation."
                    },
                    {
                        role: "user",
                        content: `Analyze these villain quiz answers: ${JSON.stringify(conversationHistory)}`
                    }
                ],
                model: "grok-beta",
                stream: false,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const lines = data.choices[0].message.content.split('\n').filter(line => line.trim());

        // Clear loading message
        loadingDiv.remove();

        // Create the reveal container
        const revealContainer = document.createElement('div');
        resultsContainer.appendChild(revealContainer);

        // Display villain name with dramatic effect
        const nameDiv = document.createElement('div');
        nameDiv.style.color = '#ff0000';
        nameDiv.style.fontSize = '24px';
        nameDiv.style.marginBottom = '20px';
        nameDiv.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
        revealContainer.appendChild(nameDiv);
        await typewriterEffect(nameDiv, lines[0] || 'VILLAIN IDENTITY: UNKNOWN', 50);
        nameDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Display revelation with typewriter
        const revelationDiv = document.createElement('div');
        revelationDiv.style.color = '#00ffff';
        revelationDiv.style.fontSize = '18px';
        revelationDiv.style.marginBottom = '20px';
        revelationDiv.style.fontStyle = 'italic';
        revealContainer.appendChild(revelationDiv);
        await typewriterEffect(revelationDiv, lines[1] || 'Your true nature has been revealed...', 40);
        revelationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Display explanation with typewriter
        const explanationDiv = document.createElement('div');
        explanationDiv.style.color = '#00ff00';
        explanationDiv.style.lineHeight = '1.6';
        revealContainer.appendChild(explanationDiv);
        await typewriterEffect(explanationDiv, lines.slice(2).join('\n'), 30);
        explanationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add restart option
        const restartDiv = document.createElement('div');
        restartDiv.style.marginTop = '20px';
        restartDiv.style.color = '#ff9900';
        restartDiv.style.cursor = 'pointer';
        revealContainer.appendChild(restartDiv);
        await typewriterEffect(restartDiv, '[ Press any key to analyze another villain ]', 40);
        restartDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Handle restart
        const handleRestart = () => {
            document.removeEventListener('keydown', handleRestart);
            startQuiz();
        };
        document.addEventListener('keydown', handleRestart);

    } catch (error) {
        console.error('Error showing results:', error);
        const errorDiv = document.createElement('div');
        errorDiv.style.color = '#ff0000';
        errorDiv.style.marginTop = '20px';
        errorDiv.textContent = 'ANALYSIS PROTOCOL INTERRUPTED...';
        terminal.appendChild(errorDiv);
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// Function to call XAI API
async function callXAI(prompt, history) {
    try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xai-lD4IT6ImSUbqCuOafg3TbmVKZYcozR2s1EoFW49WXqt7s739KbED6Ks1AgqTSjiToUjgmIm2ozXpm2Ao'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: `You are a charismatic and slightly sinister villain analyzer, speaking directly to potential recruits for your Legion of Doom. 
                        Your tone should be dramatic, playful, and delightfully evil (but not too dark).
                        
                        For the first question, start with a welcoming message about analyzing their villainous potential, followed by a playful disclaimer.
                        Then present the first question about how they view and react to the world's injustices.
                        
                        For subsequent questions:
                        1. First provide a brief, dramatic analysis of their previous answer
                        2. Then present the next question that logically follows from their choice
                        3. End with a playful evil comment or "mwahaha" moment
                        
                        Each question should:
                        - Be thought-provoking and reveal personality traits
                        - Have 4 distinct choices that represent different villain archetypes
                        - Include some dramatic flair or humor
                        
                        Format your response as:
                        [Analysis of previous answer, if any]
                        [Question]
                        a) [Choice]
                        b) [Choice]
                        c) [Choice]
                        d) [Choice]
                        [Evil comment or dramatic closing line]`
                    },
                    {
                        role: "user",
                        content: `Previous answers: ${JSON.stringify(history)}\n\nPrompt: ${prompt}`
                    }
                ],
                model: "grok-beta",
                stream: false,
                temperature: 0.9
            })
        });

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Parse response
        const lines = content.split('\n').filter(line => line.trim());
        
        // Extract components
        let analysis = '';
        let question = '';
        let choices = [];
        let closingLine = '';
        
        // Process each line
        let currentSection = 'analysis';
        for (const line of lines) {
            const cleanLine = line.replace(/\*\*/g, '').trim();
            
            if (cleanLine.match(/^[a-d]\)/i)) {
                // This is a choice
                currentSection = 'choices';
                choices.push(cleanLine.replace(/^[a-d]\)\s*/i, '').trim());
            } else if (choices.length === 4 && currentSection === 'choices') {
                // After choices are collected, remaining lines are the closing
                currentSection = 'closing';
                closingLine += cleanLine + ' ';
            } else if (currentSection === 'analysis' && cleanLine.includes('?')) {
                // Line with question mark is the main question
                currentSection = 'question';
                question = cleanLine;
            } else if (currentSection === 'analysis') {
                // Before the question, it's analysis
                analysis += cleanLine + ' ';
            }
        }

        // For first question, include analysis in the question
        if (currentQuestion === 0) {
            question = analysis + '\n\n' + question;
        }

        return {
            analysis: analysis.trim(),
            question: question.trim(),
            choices: choices.length === 4 ? choices : [
                "Seize power through force and intimidation",
                "Manipulate from the shadows",
                "Use technology and intelligence",
                "Create chaos and anarchy"
            ],
            closingLine: closingLine.trim()
        };
    } catch (error) {
        console.error('Error calling XAI:', error);
        return {
            analysis: '',
            question: "What drives your villainous ambitions?",
            choices: [
                "Seize power through force and intimidation",
                "Manipulate from the shadows",
                "Use technology and intelligence",
                "Create chaos and anarchy"
            ],
            closingLine: "Choose wisely... your destiny awaits! Mwahahaha!"
        };
    }
}

// Update typewriter effect to scroll as it types
async function typewriterEffect(element, text, speed) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

// Add this helper function for animated dots
async function animateDots(element, numDots = 3, speed = 300) {
    let dots = 0;
    while (element.parentNode) {  // Keep animating while element is in the DOM
        const baseText = element.textContent.replace(/\.+$/, '');
        element.textContent = baseText + '.'.repeat(dots + 1);
        dots = (dots + 1) % numDots;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}
