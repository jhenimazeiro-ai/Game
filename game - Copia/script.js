// script.js

// --------------------------------------------------------------------------------------
// A ÁRVORE DE DECISÃO EM INGLÊS
// --------------------------------------------------------------------------------------
const storyTree = {
    // -----------------------------------------------------
    // 0. INTRODUÇÃO (NEW START SCREEN)
    // -----------------------------------------------------
    'intro': {
        text: "Every choice ripples across time. The smallest decision can change the entire world. In this game, you confront the paradox of freedom and fate, just like in 'The Butterfly Effect'. Prepare to sacrifice identity, happiness, or morality itself. \n\nYour first decision awaits.",
        options: [
            { text: "Start the Game", next: 'start' } 
        ]
    },

    // -----------------------------------------------------
    // 1. START: The Burden of Perfection
    // -----------------------------------------------------
    'start': {
        text: "Question 1: You have the power to change one past event to **guarantee the lifelong happiness of a loved one**. But, this change will make you forget all your life lessons and memories. Do you erase your past self for their happiness?",
        options: [
            { text: "Option A: Yes, sacrifice my past for their permanent happiness.", next: 'track_A' },
            { text: "Option B: No, my past struggles define who I am. I keep my memories.", next: 'track_B' }
        ]
    },

    // -----------------------------------------------------
    // 2. CONSEQUENCE TRACK A: The Sacrificed Self
    // -----------------------------------------------------
    'track_A': {
        text: "Question 2: You woke up successful, and your loved one is happy. But you feel empty, knowing your life is a beautiful lie. Do you live the perfect life, or risk chaos to find out who you really were?",
        options: [
            { text: "Option A1: Live the lie (Duty to keep them happy).", next: 'final_A1_choice' },
            { text: "Option B1: Seek the truth (Authenticity is more important).", next: 'final_B1_choice' }
        ]
    },

    // -----------------------------------------------------
    // 3. CONSEQUENCE TRACK B: The Inertia of Choice
    // -----------------------------------------------------
    'track_B': {
        text: "Question 3: You chose not to interfere. Your loved one is suffering. Which makes you more responsible for their pain: **causing** it with a bad action, or **allowing** it by not using your power to help?",
        options: [
            { text: "Option A2: Accept Inaction (Their free will is not my business).", next: 'final_A2_choice' },
            { text: "Option B2: Intervene Now (My moral duty is to stop the suffering).", next: 'final_B2_choice' }
        ]
    },
    
    // -----------------------------------------------------
    // 4. FINAL PATH A1 CHOICE: The Cost of Duty
    // -----------------------------------------------------
    'final_A1_choice': {
        text: "FINAL DILEMMA (A1): Your hollow life causes you to resent the person you saved. Do you completely remove yourself from their life (The Final Cut), or confess the truth, risking their happiness for a chance at a real bond (The Confession)?",
        options: [
            { text: "Option A1-1: The Final Cut (Disappear completely).", next: 'end_A11' },
            { text: "Option A1-2: The Confession (Tell them everything).", next: 'end_A12' }
        ]
    },
    
    // -----------------------------------------------------
    // 5. FINAL PATH B1 CHOICE: The Weight of Knowledge
    // -----------------------------------------------------
    'final_B1_choice': {
        text: "FINAL DILEMMA (B1): You brought truth back. Your loved one now asks you to erase the **memory of the perfection** you once had. Do you erase the perfect memory to start a real life, or try to find a *new* perfect outcome?",
        options: [
            { text: "Option B1-1: Erase the Memory of Perfection (Accept the struggle).", next: 'end_B11' },
            { text: "Option B1-2: Seek the Next Perfection (Try changing the past again).", next: 'end_B12' }
        ]
    },

    // -----------------------------------------------------
    // 6. FINAL PATH A2 CHOICE: The Price of Inertia
    // -----------------------------------------------------
    'final_A2_choice': {
        text: "FINAL DILEMMA (A2): Your non-action allowed their pain to spread and harm others. Can you subtly inspire them to **turn their pain into art/activism** (Hidden Hand), or must you still accept the chaos and stay out (Isolation)?",
        options: [
            { text: "Option A2-1: Send Anonymous Inspiration (Interfere secretly).", next: 'end_A21' },
            { text: "Option A2-2: Step Back Completely (Maintain non-intervention).", next: 'end_A22' }
        ]
    },

    // -----------------------------------------------------
    // 7. FINAL PATH B2 CHOICE: The Acceptance of Chaos
    // -----------------------------------------------------
    'final_B2_choice': {
        text: "FINAL DILEMMA (B2): Your kind intervention fixed their life, but ruined yours (you are an exile). Do you **restore your own life** (The Selfish Loop), or accept the loss, knowing you did one small good (Redemptive Chaos)?",
        options: [
            { text: "Option B2-1: Restore Your Own Life.", next: 'end_B21' },
            { text: "Option B2-2: Embrace the Exile.", next: 'end_B22' }
        ]
    },
    
    // -----------------------------------------------------
    // FINAL OUTCOMES 
    // -----------------------------------------------------
    'end_A11': {
        text: "FINAL OUTCOME: The Triumphant Lie. You are erased, but your loved one is perfectly happy. The greatest good was achieved by erasing yourself and the truth. (The End)",
        options: []
    },
    'end_A12': {
        text: "FINAL OUTCOME: The Painful Truth. Your confession brings back chaos, but you are finally known for who you are. Authenticity was worth more than forced perfection. (The End)",
        options: []
    },
    'end_B11': {
        text: "FINAL OUTCOME: The Noble Fight. You erase the memory of false happiness. The most valuable life is built from accepting the struggle and imperfection. (The End)",
        options: []
    },
    'end_B12': {
        text: "FINAL OUTCOME: The Endless Loop. You try changing the past again. The desire to escape pain leads to an endless, tiring cycle of chaos and regret. (The End)",
        options: []
    },
    'end_A21': {
        text: "FINAL OUTCOME: The Hidden Hand. You subtly guide their suffering toward creativity. Good was achieved through secret, indirect manipulation. (The End)",
        options: []
    },
    'end_A22': {
        text: "FINAL OUTCOME: The Isolation of Integrity. You stay out completely. Your decision to remain 'pure' leads to loneliness and bad consequences for others. (The End)",
        options: []
    },
    'end_B21': {
        text: "FINAL OUTCOME: The Selfish Loop. You undo your past choice to regain your good life. In the end, the desire to save yourself was stronger than morality. (The End)",
        options: []
    },
    'end_B22': {
        text: "FINAL OUTCOME: The Redemptive Chaos. You accept being an exile. Your reward is knowing you did one good, selfless act. True life is found in sacrifice. (The End)",
        options: []
    }
};


// -----------------------------------------------------
// FUNÇÃO DE RENDERIZAÇÃO
// -----------------------------------------------------

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

function loadState(stateKey) {
    const state = storyTree[stateKey];
    if (!state) return;

    questionText.innerText = state.text;
    optionsContainer.innerHTML = ''; 

    state.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.innerText = option.text;
        
        if (option.next) {
            button.addEventListener('click', () => {
                loadState(option.next);
            });
        }
        
        optionsContainer.appendChild(button);
    });
}

// INICIA O JOGO CARREGANDO A INTRODUÇÃO!
loadState('intro');