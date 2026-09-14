/* =========================================================
   AI LEARNING ACADEMY
   COMPLETE JAVASCRIPT
   BMSCE SEMESTER V STUDY EDITION
   ========================================================= */


/* =========================================================
   APPLICATION STATE
   ========================================================= */

const STORAGE_KEY = "aiAcademyCompleteState";

let state = {
    completed: [],
    quizScore: 0,
    quizAttempts: 0,
    topicScores: {}
};

const savedState = localStorage.getItem(STORAGE_KEY);

if (savedState) {

    try {

        state = {
            ...state,
            ...JSON.parse(savedState)
        };

    } catch (error) {

        console.log("Could not load saved progress.");

    }
}


/* =========================================================
   SAVE STATE
   ========================================================= */

function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

}


/* =========================================================
   THEME
   ========================================================= */

function loadTheme() {

    const theme = localStorage.getItem("aiAcademyTheme");

    if (theme === "light") {

        document.body.classList.add("light-mode");

    } else {

        document.body.classList.remove("light-mode");

    }

}


function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "aiAcademyTheme",
        isLight ? "light" : "dark"
    );

}


/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {

        section.classList.remove("active");

    });

    const target =
        document.getElementById(sectionId);

    if (target) {

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    document.querySelectorAll(".nav-link").forEach(link => {

        link.classList.remove("active");

    });

    const activeLink =
        document.querySelector(
            `[onclick="showSection('${sectionId}')"]`
        );

    if (activeLink) {

        activeLink.classList.add("active");

    }

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {

    const nav =
        document.querySelector(".nav-links");

    if (nav) {

        nav.classList.toggle("open");

    }

}


/* =========================================================
   LESSON DATA
   ========================================================= */

const lessons = [

    {
        id: "ai-intro",
        title: "Introduction to Artificial Intelligence",
        category: "AI Fundamentals",
        difficulty: "Beginner",
        description:
            "Understand what Artificial Intelligence is, how AI systems work, and where AI is used.",
        content: `
            <h2>Introduction to Artificial Intelligence</h2>

            <p>
                Artificial Intelligence is the field of computer science
                concerned with building systems that can perform tasks
                that normally require human intelligence.
            </p>

            <h3>Examples of AI</h3>

            <ul>
                <li>Recommendation systems</li>
                <li>Speech recognition</li>
                <li>Image recognition</li>
                <li>Autonomous systems</li>
                <li>Chatbots</li>
                <li>Medical diagnosis systems</li>
            </ul>

            <h3>Important idea</h3>

            <p>
                An AI system generally receives information from its
                environment, processes that information and produces
                an action or prediction.
            </p>
        `
    },

    {
        id: "ml-intro",
        title: "Introduction to Machine Learning",
        category: "Machine Learning",
        difficulty: "Beginner",
        description:
            "Learn the basic idea behind machine learning and its major types.",
        content: `
            <h2>Introduction to Machine Learning</h2>

            <p>
                Machine Learning is a branch of Artificial Intelligence
                in which a computer system learns patterns from data
                and uses those patterns to make predictions or decisions.
            </p>

            <h3>Major types</h3>

            <ul>
                <li>Supervised Learning</li>
                <li>Unsupervised Learning</li>
                <li>Semi-Supervised Learning</li>
                <li>Reinforcement Learning</li>
            </ul>

            <h3>Simple example</h3>

            <p>
                Suppose we have data containing house size and house price.
                A machine-learning algorithm can learn the relationship
                between these variables and predict the price of a new house.
            </p>
        `
    },

    {
        id: "dl-intro",
        title: "Introduction to Deep Learning",
        category: "Deep Learning",
        difficulty: "Beginner",
        description:
            "Understand neural networks and why deep learning is useful.",
        content: `
            <h2>Introduction to Deep Learning</h2>

            <p>
                Deep Learning is a subfield of machine learning that
                uses neural networks containing multiple layers to learn
                complex patterns from data.
            </p>

            <h3>Typical structure</h3>

            <p>
                Input Layer → Hidden Layers → Output Layer
            </p>

            <p>
                Deep networks can automatically learn useful representations
                from images, text, audio and other forms of data.
            </p>
        `
    }

];


/* =========================================================
   LESSON FILTER
   ========================================================= */

function filterLessons() {

    const searchBox =
        document.getElementById("lessonSearch");

    if (!searchBox) return;

    const query =
        searchBox.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".lesson-card");

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (text.includes(query)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* =========================================================
   LESSON MODAL
   ========================================================= */

function openLesson(id) {

    const lesson =
        lessons.find(item => item.id === id);

    if (!lesson) return;

    const modal =
        document.getElementById("lessonModal");

    const title =
        document.getElementById("modalTitle");

    const body =
        document.getElementById("modalBody");

    if (!modal || !title || !body) return;

    title.textContent = lesson.title;

    body.innerHTML = lesson.content;

    modal.classList.add("active");

}


function closeModal() {

    const modal =
        document.getElementById("lessonModal");

    if (modal) {

        modal.classList.remove("active");

    }

}


/* =========================================================
   PROGRESS
   ========================================================= */

function markCompleted(id) {

    if (!state.completed.includes(id)) {

        state.completed.push(id);

        saveState();

    }

    updateProgress();

}


function isCompleted(id) {

    return state.completed.includes(id);

}


function updateProgress() {

    const total =
        document.querySelectorAll("[data-topic-id]").length;

    const completed =
        state.completed.length;

    const percentage =
        total > 0
            ? Math.round((completed / total) * 100)
            : 0;

    const progressText =
        document.getElementById("progressText");

    const progressBar =
        document.getElementById("progressBar");

    if (progressText) {

        progressText.textContent =
            `${percentage}% Complete`;

    }

    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }

}


/* =========================================================
   DEEP LEARNING UNIT RENDERING
   ========================================================= */

function renderDLUnit(unitNumber) {

    const container =
        document.getElementById("dlUnitContent");

    if (!container) return;

    const unit =
        deepLearningUnits.find(
            item => item.unit === unitNumber
        );

    if (!unit) return;

    container.innerHTML = `

        <div class="unit-header">

            <span class="unit-number">
                UNIT ${unit.unit}
            </span>

            <h2>${unit.title}</h2>

            <p>${unit.description}</p>

        </div>

        <div class="topic-grid">

            ${unit.topics.map(topic => `

                <div
                    class="topic-card"
                    data-topic-id="${topic.id}"
                >

                    <div class="topic-icon">
                        ${topic.icon || "📘"}
                    </div>

                    <h3>${topic.title}</h3>

                    <p>
                        ${topic.short || ""}
                    </p>

                    <button
                        class="primary-btn"
                        onclick="openStudyTopic('${topic.id}')"
                    >
                        Study Topic
                    </button>

                </div>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   DEEP LEARNING DATA
   ========================================================= */

const deepLearningUnits = [

    {
        unit: 1,
        title: "Neural Network Fundamentals",
        description:
            "Learn the foundations of neural networks, perceptrons and multilayer networks.",
        topics: [

            {
                id: "dl-u1-neural-network",
                icon: "🧠",
                title: "What is a Neural Network?",
                short:
                    "Understand the basic idea of artificial neural networks."
            },

            {
                id: "dl-u1-neuron",
                icon: "⚡",
                title: "Model of a Neuron",
                short:
                    "Learn how inputs, weights, bias and activation produce an output."
            },

            {
                id: "dl-u1-graph",
                icon: "🔗",
                title: "Neural Network as a Graph",
                short:
                    "Understand nodes, edges, weights and network representation."
            },

            {
                id: "dl-u1-architecture",
                icon: "🏗️",
                title: "Network Architectures",
                short:
                    "Learn single-layer, multilayer and feedforward architectures."
            },

            {
                id: "dl-u1-perceptron",
                icon: "🔵",
                title: "Perceptron",
                short:
                    "Learn the perceptron model and its learning rule."
            },

            {
                id: "dl-u1-convergence",
                icon: "📈",
                title: "Perceptron Convergence Theorem",
                short:
                    "Understand when the perceptron learning algorithm converges."
            },

            {
                id: "dl-u1-learning-curves",
                icon: "📊",
                title: "Learning Curves",
                short:
                    "Understand training performance and learning behaviour."
            },

            {
                id: "dl-u1-lms",
                icon: "🧮",
                title: "Least Mean Square Algorithm",
                short:
                    "Learn LMS and work through a numerical example."
            },

            {
                id: "dl-u1-mlp",
                icon: "🕸️",
                title: "Multilayer Perceptron",
                short:
                    "Understand hidden layers and nonlinear decision boundaries."
            },

            {
                id: "dl-u1-backprop",
                icon: "🔄",
                title: "Backpropagation Algorithm",
                short:
                    "Learn forward propagation, error calculation and weight updates."
            },

            {
                id: "dl-u1-xor",
                icon: "❌",
                title: "XOR Problem",
                short:
                    "Understand why a single perceptron cannot solve XOR."
            },

            {
                id: "dl-u1-online-batch",
                icon: "⚙️",
                title: "Online and Batch Learning",
                short:
                    "Compare the two approaches to updating model parameters."
            },

            {
                id: "dl-u1-learning-rate",
                icon: "🎚️",
                title: "Learning Rate",
                short:
                    "Understand learning rate, annealing and adaptive control."
            }

        ]
    },

    {
        unit: 2,
        title: "Deep Feedforward Networks",
        description:
            "Learn gradient-based training, hidden units, ReLU and methods for faster training.",
        topics: [

            {
                id: "dl-u2-feedforward",
                icon: "➡️",
                title: "Deep Feedforward Networks",
                short:
                    "Understand the architecture and operation of deep feedforward networks."
            },

            {
                id: "dl-u2-gradient",
                icon: "📉",
                title: "Gradient-Based Learning",
                short:
                    "Learn how gradients are used to minimize a loss function."
            },

            {
                id: "dl-u2-hidden",
                icon: "🧩",
                title: "Hidden Units",
                short:
                    "Understand the role of hidden units in learning representations."
            },

            {
                id: "dl-u2-saturation",
                icon: "⚠️",
                title: "Saturation",
                short:
                    "Understand saturation and its effect on gradient-based learning."
            },

            {
                id: "dl-u2-vanishing",
                icon: "📉",
                title: "Vanishing Gradient",
                short:
                    "Understand why gradients become very small in deep networks."
            },

            {
                id: "dl-u2-relu",
                icon: "🔺",
                title: "ReLU",
                short:
                    "Learn the Rectified Linear Unit activation function."
            },

            {
                id: "dl-u2-local-minima",
                icon: "⛰️",
                title: "Bad Local Minima",
                short:
                    "Understand local minima and heuristics for training."
            },

            {
                id: "dl-u2-fast-training",
                icon: "🚀",
                title: "Faster Training",
                short:
                    "Learn practical ideas for improving training speed."
            },

            {
                id: "dl-u2-nesterov",
                icon: "🎯",
                title: "Nesterov Accelerated Gradient",
                short:
                    "Understand Nesterov momentum and its update idea."
            }

        ]
    },

    {
        unit: 3,
        title: "Regularization and Optimization",
        description:
            "Learn methods used to improve generalization and optimize neural-network training.",
        topics: [

            {
                id: "dl-u3-norm",
                icon: "📐",
                title: "Parameter Norm Penalties",
                short:
                    "Understand regularization through parameter norms."
            },

            {
                id: "dl-u3-constrained",
                icon: "🔒",
                title: "Constrained Optimization",
                short:
                    "Understand regularization as constrained optimization."
            },

            {
                id: "dl-u3-augmentation",
                icon: "🖼️",
                title: "Dataset Augmentation",
                short:
                    "Learn how additional training variations improve generalization."
            },

            {
                id: "dl-u3-noise",
                icon: "🌪️",
                title: "Noise Robustness",
                short:
                    "Understand how models can become robust to noisy inputs."
            },

            {
                id: "dl-u3-semi",
                icon: "🔀",
                title: "Semi-Supervised Learning",
                short:
                    "Understand learning using labelled and unlabelled data."
            },

            {
                id: "dl-u3-multitask",
                icon: "🧠",
                title: "Multi-Task Learning",
                short:
                    "Learn how one model can learn multiple related tasks."
            },

            {
                id: "dl-u3-early",
                icon: "⏹️",
                title: "Early Stopping",
                short:
                    "Understand how stopping training can reduce overfitting."
            },

            {
                id: "dl-u3-sharing",
                icon: "🔗",
                title: "Parameter Tying and Sharing",
                short:
                    "Understand shared parameters and their importance."
            },

            {
                id: "dl-u3-sparse",
                icon: "🧱",
                title: "Sparse Representations",
                short:
                    "Learn the idea of sparse neural representations."
            },

            {
                id: "dl-u3-dropout",
                icon: "🎲",
                title: "Dropout",
                short:
                    "Understand how randomly dropping units helps regularization."
            },

            {
                id: "dl-u3-adversarial",
                icon: "🛡️",
                title: "Adversarial Training",
                short:
                    "Understand training methods that improve robustness."
            },

            {
                id: "dl-u3-tangent",
                icon: "📏",
                title: "Tangent Methods",
                short:
                    "Learn tangent distance, tangent propagation and manifold tangent classifiers."
            },

            {
                id: "dl-u3-adaboost",
                icon: "➕",
                title: "AdaBoost",
                short:
                    "Understand the boosting approach to combining weak learners."
            },

            {
                id: "dl-u3-rmsprop",
                icon: "⚡",
                title: "RMSProp",
                short:
                    "Learn the RMSProp optimization method."
            }

        ]
    },

    {
        unit: 4,
        title: "Convolutional Neural Networks",
        description:
            "Learn CNN structure, filters, convolution and CNN backpropagation.",
        topics: [

            {
                id: "dl-u4-cnn-intro",
                icon: "🖼️",
                title: "Introduction to CNN",
                short:
                    "Understand why convolutional networks are useful for structured data."
            },

            {
                id: "dl-u4-structure",
                icon: "🏗️",
                title: "CNN Structure",
                short:
                    "Learn convolution, feature maps and pooling."
            },

            {
                id: "dl-u4-filter",
                icon: "🔍",
                title: "Filters",
                short:
                    "Understand filters and how they detect patterns."
            },

            {
                id: "dl-u4-convolution",
                icon: "➗",
                title: "Convolution Operation",
                short:
                    "Work through a numerical convolution example."
            },

            {
                id: "dl-u4-training",
                icon: "🎓",
                title: "Training a CNN",
                short:
                    "Understand forward propagation and learning in CNNs."
            },

            {
                id: "dl-u4-backprop",
                icon: "🔄",
                title: "Backpropagation Through Convolution",
                short:
                    "Understand how errors propagate through convolution layers."
            },

            {
                id: "dl-u4-transposed",
                icon: "↔️",
                title: "Transposed Convolution",
                short:
                    "Understand the basic idea of transposed convolution."
            },

            {
                id: "dl-u4-matrix",
                icon: "🔢",
                title: "Matrix Multiplication View",
                short:
                    "Understand convolution as matrix multiplication."
            },

            {
                id: "dl-u4-augmentation",
                icon: "🖼️",
                title: "Data Augmentation",
                short:
                    "Learn image transformations used to improve training."
            }

        ]
    },

    {
        unit: 5,
        title: "Recurrent Neural Networks",
        description:
            "Learn RNNs, language modelling, LSTM, GRU and applications.",
        topics: [

            {
                id: "dl-u5-rnn",
                icon: "🔁",
                title: "Introduction to RNN",
                short:
                    "Understand recurrent neural networks and sequence processing."
            },

            {
                id: "dl-u5-expressiveness",
                icon: "🧠",
                title: "RNN Expressiveness",
                short:
                    "Understand what RNNs can represent."
            },

            {
                id: "dl-u5-architecture",
                icon: "🏗️",
                title: "RNN Architecture",
                short:
                    "Learn the basic recurrent architecture."
            },

            {
                id: "dl-u5-language",
                icon: "📝",
                title: "Language Modelling",
                short:
                    "Understand how RNNs can model sequences of words."
            },

            {
                id: "dl-u5-backprop",
                icon: "🔄",
                title: "Backpropagation Through Time",
                short:
                    "Understand how RNNs are trained over sequences."
            },

            {
                id: "dl-u5-bidirectional",
                icon: "↔️",
                title: "Bidirectional RNN",
                short:
                    "Learn how information can be processed in both directions."
            },

            {
                id: "dl-u5-multilayer",
                icon: "🏢",
                title: "Multilayer RNN",
                short:
                    "Understand stacked recurrent layers."
            },

            {
                id: "dl-u5-challenges",
                icon: "⚠️",
                title: "Challenges of Training RNNs",
                short:
                    "Understand vanishing and exploding gradient problems."
            },

            {
                id: "dl-u5-layernorm",
                icon: "📏",
                title: "Layer Normalization",
                short:
                    "Understand normalization inside recurrent networks."
            },

            {
                id: "dl-u5-esn",
                icon: "🌐",
                title: "Echo State Networks",
                short:
                    "Learn the basic idea of reservoir computing."
            },

            {
                id: "dl-u5-lstm",
                icon: "🧠",
                title: "LSTM",
                short:
                    "Understand cells, gates and long-term memory."
            },

            {
                id: "dl-u5-gru",
                icon: "🔋",
                title: "GRU",
                short:
                    "Understand the simplified gated recurrent architecture."
            },

            {
                id: "dl-u5-applications",
                icon: "🚀",
                title: "Applications of RNN",
                short:
                    "Explore practical applications of recurrent networks."
            }

        ]
    }

];


/* =========================================================
   STUDY TOPIC DATABASE
   ========================================================= */

const studyTopics = {