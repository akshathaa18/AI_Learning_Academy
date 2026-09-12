/* =========================================================
   AI LEARNING ACADEMY
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   NEURAL NETWORK BACKGROUND
========================================================= */

const neuralCanvas =
    document.getElementById("neuralCanvas");

const neuralCtx =
    neuralCanvas.getContext("2d");


const NEURAL_CONFIG = {

    nodes: 75,

    connectionDistance: 145,

    speed: 0.35,

    nodeRadius: 2,

    glow: 10

};


let neuralNodes = [];

let reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* Resize canvas */

function resizeNeuralCanvas() {

    const pixelRatio =
        Math.min(window.devicePixelRatio || 1, 2);

    neuralCanvas.width =
        window.innerWidth * pixelRatio;

    neuralCanvas.height =
        window.innerHeight * pixelRatio;

    neuralCanvas.style.width =
        window.innerWidth + "px";

    neuralCanvas.style.height =
        window.innerHeight + "px";

    neuralCtx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

    createNeuralNodes();
}


/* Create nodes */

function createNeuralNodes() {

    neuralNodes = [];

    const count =
        window.innerWidth < 600
            ? 35
            : NEURAL_CONFIG.nodes;


    for (let i = 0; i < count; i++) {

        neuralNodes.push({

            x: Math.random() * window.innerWidth,

            y: Math.random() * window.innerHeight,

            vx:
                (Math.random() - 0.5) *
                NEURAL_CONFIG.speed,

            vy:
                (Math.random() - 0.5) *
                NEURAL_CONFIG.speed

        });

    }

}


/* Draw neural network */

function drawNeuralNetwork() {

    neuralCtx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    /* Connections */

    for (
        let i = 0;
        i < neuralNodes.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < neuralNodes.length;
            j++
        ) {

            const node1 =
                neuralNodes[i];

            const node2 =
                neuralNodes[j];


            const dx =
                node1.x - node2.x;

            const dy =
                node1.y - node2.y;

            const distance =
                Math.sqrt(
                    dx * dx + dy * dy
                );


            if (
                distance <
                NEURAL_CONFIG.connectionDistance
            ) {

                const opacity =
                    (
                        1 -
                        distance /
                        NEURAL_CONFIG.connectionDistance
                    ) * 0.20;


                neuralCtx.beginPath();

                neuralCtx.moveTo(
                    node1.x,
                    node1.y
                );

                neuralCtx.lineTo(
                    node2.x,
                    node2.y
                );

                neuralCtx.strokeStyle =
                    `rgba(139, 92, 246, ${opacity})`;

                neuralCtx.lineWidth = 1;

                neuralCtx.stroke();
            }

        }

    }


    /* Nodes */

    for (const node of neuralNodes) {

        neuralCtx.beginPath();

        neuralCtx.arc(
            node.x,
            node.y,
            NEURAL_CONFIG.nodeRadius,
            0,
            Math.PI * 2
        );


        neuralCtx.fillStyle =
            "#8b5cf6";

        neuralCtx.shadowBlur =
            NEURAL_CONFIG.glow;

        neuralCtx.shadowColor =
            "#8b5cf6";

        neuralCtx.fill();

        neuralCtx.shadowBlur = 0;


        /* Movement */

        if (!reducedMotion) {

            node.x += node.vx;

            node.y += node.vy;

        }


        /* Screen wrapping */

        if (node.x < -10)
            node.x = window.innerWidth + 10;

        if (node.x >
            window.innerWidth + 10)
            node.x = -10;

        if (node.y < -10)
            node.y = window.innerHeight + 10;

        if (node.y >
            window.innerHeight + 10)
            node.y = -10;

    }

}


/* Animation loop */

function neuralAnimation() {

    drawNeuralNetwork();

    requestAnimationFrame(
        neuralAnimation
    );

}


window.addEventListener(
    "resize",
    resizeNeuralCanvas
);

resizeNeuralCanvas();

neuralAnimation();


/* =========================================================
   NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(".section");

const navButtons =
    document.querySelectorAll(".nav-btn");


function showSection(sectionId) {

    sections.forEach(section => {

        section.classList.remove("active");

    });


    navButtons.forEach(button => {

        button.classList.remove("active");

    });


    const section =
        document.getElementById(sectionId);

    if (section) {

        section.classList.add("active");

    }


    const button =
        document.querySelector(
            `.nav-btn[data-section="${sectionId}"]`
        );

    if (button) {

        button.classList.add("active");

    }


    window.scrollTo({

        top: 0,

        behavior:
            reducedMotion
                ? "auto"
                : "smooth"

    });

}


navButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showSection(
                button.dataset.section
            );

        }
    );

});


document.querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.go
                );

            }
        );

    });


/* =========================================================
   COURSE DATA
========================================================= */

const courses = [

    {
        id: 1,

        icon: "🧠",

        title: "AI Fundamentals",

        level: "Beginner",

        lessons: 5,

        description:
            "Understand AI, intelligent agents, search and problem solving.",

        content: {

            intro:
                "Artificial Intelligence is the field of creating systems that can perform tasks requiring intelligent behavior.",

            topics: [

                "What is Artificial Intelligence?",

                "History of AI",

                "Types of AI",

                "Intelligent Agents",

                "Problem Solving",

                "State Space Search",

                "BFS, DFS and UCS"

            ]

        }

    },


    {
        id: 2,

        icon: "📐",

        title: "Mathematics for AI",

        level: "Beginner",

        lessons: 6,

        description:
            "Build the mathematical foundation required for AI and machine learning.",

        content: {

            intro:
                "Mathematics provides the language used by machine learning algorithms.",

            topics: [

                "Linear Algebra",

                "Vectors",

                "Matrices",

                "Probability",

                "Statistics",

                "Calculus",

                "Gradients",

                "Optimization"

            ]

        }

    },


    {
        id: 3,

        icon: "📊",

        title: "Machine Learning",

        level: "Intermediate",

        lessons: 8,

        description:
            "Learn how machines learn patterns from data.",

        content: {

            intro:
                "Machine learning allows computers to learn patterns from examples instead of being explicitly programmed for every situation.",

            topics: [

                "Supervised Learning",

                "Unsupervised Learning",

                "Regression",

                "Classification",

                "Clustering",

                "Model Training",

                "Validation",

                "Overfitting"

            ]

        }

    },


    {
        id: 4,

        icon: "⚙️",

        title: "ML Algorithms",

        level: "Intermediate",

        lessons: 8,

        description:
            "Understand important machine learning algorithms.",

        content: {

            intro:
                "Algorithms are the practical tools used to learn relationships in data.",

            topics: [

                "Linear Regression",

                "Logistic Regression",

                "Decision Trees",

                "KNN",

                "Naive Bayes",

                "SVM",

                "K-Means",

                "Random Forest"

            ]

        }

    },


    {
        id: 5,

        icon: "🔥",

        title: "Deep Learning",

        level: "Advanced",

        lessons: 8,

        description:
            "Learn neural networks and modern deep learning.",

        content: {

            intro:
                "Deep learning uses layers of artificial neurons to learn increasingly complex representations of data.",

            topics: [

                "Artificial Neurons",

                "Perceptron",

                "Activation Functions",

                "Forward Propagation",

                "Backpropagation",

                "Gradient Descent",

                "CNN",

                "RNN"

            ]

        }

    },


    {
        id: 6,

        icon: "💬",

        title: "Natural Language Processing",

        level: "Advanced",

        lessons: 6,

        description:
            "Teach computers to understand and generate human language.",

        content: {

            intro:
                "NLP combines language, statistics and machine learning to process human communication.",

            topics: [

                "Text preprocessing",

                "Tokenization",

                "Stopwords",

                "Stemming",

                "TF-IDF",

                "Word Embeddings",

                "Transformers",

                "Large Language Models"

            ]

        }

    },


    {
        id: 7,

        icon: "👁️",

        title: "Computer Vision",

        level: "Advanced",

        lessons: 6,

        description:
            "Learn how machines understand images and visual information.",

        content: {

            intro:
                "Computer vision enables machines to extract meaningful information from images and videos.",

            topics: [

                "Images and Pixels",

                "Image preprocessing",

                "Feature extraction",

                "CNN",

                "Object Detection",

                "Image Classification",

                "Segmentation"

            ]

        }

    },


    {
        id: 8,

        icon: "🎮",

        title: "Reinforcement Learning",

        level: "Advanced",

        lessons: 5,

        description:
            "Learn how agents learn through actions and rewards.",

        content: {

            intro:
                "Reinforcement learning trains an agent to make decisions by interacting with an environment.",

            topics: [

                "Agent",

                "Environment",

                "State",

                "Action",

                "Reward",

                "Policy",

                "Q-Learning",

                "Exploration vs Exploitation"

            ]

        }

    },


    {
        id: 9,

        icon: "✨",

        title: "Generative AI",

        level: "Advanced",

        lessons: 7,

        description:
            "Understand modern generative AI, LLMs and AI applications.",

        content: {

            intro:
                "Generative AI models can create new text, images, audio, code and other content.",

            topics: [

                "Generative Models",

                "Large Language Models",

                "Prompt Engineering",

                "Embeddings",

                "Vector Databases",

                "RAG",

                "AI Agents",

                "Multimodal AI"

            ]

        }

    },


    {
        id: 10,

        icon: "🚀",

        title: "AI Projects",

        level: "Advanced",

        lessons: 6,

        description:
            "Turn your knowledge into practical AI projects.",

        content: {

            intro:
                "Projects help you move from theoretical understanding to practical AI development.",

            topics: [

                "Dataset collection",

                "Data preprocessing",

                "Model selection",

                "Training",

                "Evaluation",

                "Deployment",

                "Portfolio building"

            ]

        }

    }

];


/* =========================================================
   COURSE DISPLAY
========================================================= */

const courseGrid =
    document.getElementById("courseGrid");


function renderCourses(searchText = "") {

    const search =
        searchText.toLowerCase().trim();


    const filtered =
        courses.filter(course => {

            return (

                course.title
                    .toLowerCase()
                    .includes(search)

                ||

                course.description
                    .toLowerCase()
                    .includes(search)

                ||

                course.level
                    .toLowerCase()
                    .includes(search)

            );

        });


    courseGrid.innerHTML = "";


    if (filtered.length === 0) {

        courseGrid.innerHTML = `

            <div class="course-card">

                <h3>No course found</h3>

                <p>
                    Try searching for machine learning,
                    deep learning, NLP or another AI topic.
                </p>

            </div>

        `;

        return;

    }


    filtered.forEach(course => {

        const completed =
            isCourseCompleted(course.id);


        const card =
            document.createElement("div");

        card.className =
            "course-card";


        card.innerHTML = `

            <div class="course-top">

                <span class="course-icon">
                    ${course.icon}
                </span>

                <span class="course-level">
                    ${course.level}
                </span>

            </div>

            <h3>
                ${course.title}
            </h3>

            <p>
                ${course.description}
            </p>

            <div class="course-footer">

                <span class="lesson-count">
                    🎬 ${course.lessons} lessons
                </span>

                ${
                    completed
                        ? `<span class="complete-badge">
                            ✓ Completed
                           </span>`
                        : ""
                }

            </div>

            <br>

            <button
                class="primary-btn open-course"
                data-course="${course.id}">

                ${
                    completed
                        ? "Review Course"
                        : "Start Course →"
                }

            </button>
        `;


        courseGrid.appendChild(card);

    });


    document.querySelectorAll(".open-course")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openCourse(
                        Number(button.dataset.course)
                    );

                }
            );

        });

}


document
    .getElementById("courseSearch")
    .addEventListener(
        "input",
        event => {

            renderCourses(
                event.target.value
            );

        }
    );


/* =========================================================
   COURSE MODAL
========================================================= */

const lessonModal =
    document.getElementById("lessonModal");

const lessonContent =
    document.getElementById("lessonContent");


function openCourse(id) {

    const course =
        courses.find(
            item => item.id === id
        );


    if (!course)
        return;


    const topicsHTML =
        course.content.topics
            .map(
                topic =>
                    `<li>${topic}</li>`
            )
            .join("");


    lessonContent.innerHTML = `

        <h1 class="lesson-title">
            ${course.icon}
            ${course.title}
        </h1>

        <div class="lesson-subtitle">
            ${course.level} • ${course.lessons} lessons
        </div>

        <div class="lesson-animation">

            <div class="brain">
                ${course.icon}
            </div>

        </div>

        <div class="lesson-content">

            <h3>📖 Introduction</h3>

            <p>
                ${course.content.intro}
            </p>


            <h3>🎯 What You Will Learn</h3>

            <ul>
                ${topicsHTML}
            </ul>


            <h3>💡 Why This Matters</h3>

            <p>
                Understanding ${course.title}
                gives you a foundation for building
                practical AI systems and progressing
                toward advanced machine learning.
            </p>


            <h3>🧪 Practice</h3>

            <p>
                After studying this topic, use the
                AI Lab and Quiz sections to test
                your understanding.
            </p>

        </div>

        <br>

        <button
            id="completeCourse"
            class="primary-btn">

            ✓ Mark Course Complete

        </button>

    `;


    lessonModal.classList.add("show");


    document
        .getElementById("completeCourse")
        .addEventListener(
            "click",
            () => {

                markCourseCompleted(id);

                lessonModal.classList.remove(
                    "show"
                );

                renderCourses();

                updateProgress();

            }
        );

}


document
    .getElementById("closeLesson")
    .addEventListener(
        "click",
        () => {

            lessonModal.classList.remove(
                "show"
            );

        }
    );


lessonModal.addEventListener(
    "click",
    event => {

        if (
            event.target === lessonModal
        ) {

            lessonModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   PROGRESS
========================================================= */

function getCompletedCourses() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "aiAcademyProgress"
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveCompletedCourses(list) {

    localStorage.setItem(

        "aiAcademyProgress",

        JSON.stringify(list)

    );

}


function isCourseCompleted(id) {

    return getCompletedCourses()
        .includes(id);

}


function markCourseCompleted(id) {

    const completed =
        getCompletedCourses();


    if (!completed.includes(id)) {

        completed.push(id);

    }


    saveCompletedCourses(
        completed
    );

}


function updateProgress() {

    const completed =
        getCompletedCourses();


    const total =
        courses.length;


    const percentage =
        Math.round(
            (completed.length / total) *
            100
        );


    document
        .getElementById("progressFill")
        .style.width =
        percentage + "%";


    document
        .getElementById("progressPercent")
        .textContent =
        percentage + "%";


    document
        .getElementById("progressText")
        .textContent =
        `${completed.length} of ${total} courses completed`;

}


updateProgress();

renderCourses();


/* =========================================================
   THEME
========================================================= */

const themeBtn =
    document.getElementById("themeBtn");


function updateThemeIcon() {

    themeBtn.textContent =
        document.body.classList.contains(
            "light"
        )
            ? "☀️"
            : "🌙";

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

        const isLight =
            document.body.classList.contains(
                "light"
            );


        localStorage.setItem(
            "aiAcademyTheme",
            isLight
                ? "light"
                : "dark"
        );


        updateThemeIcon();

    }
);


const savedTheme =
    localStorage.getItem(
        "aiAcademyTheme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );

}


updateThemeIcon();


/* =========================================================
   RESET PROGRESS
========================================================= */

document
    .getElementById("resetBtn")
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Reset all AI Learning Academy progress?"
                );


            if (!confirmed)
                return;


            localStorage.removeItem(
                "aiAcademyProgress"
            );


            updateProgress();

            renderCourses();

            alert(
                "Progress has been reset."
            );

        }
    );


/* =========================================================
   NEURON CALCULATOR
========================================================= */

const inputSlider =
    document.getElementById(
        "inputSlider"
    );

const weightSlider =
    document.getElementById(
        "weightSlider"
    );


function updateNeuron() {

    const input =
        Number(inputSlider.value);

    const weight =
        Number(weightSlider.value);


    const output =
        input * weight;


    document
        .getElementById("inputDisplay")
        .textContent =
        input.toFixed(2);


    document
        .getElementById("weightDisplay")
        .textContent =
        weight.toFixed(1);


    document
        .getElementById("x1Value")
        .textContent =
        input.toFixed(2);


    document
        .getElementById("neuronOutput")
        .textContent =
        output.toFixed(2);


    document
        .getElementById("formulaResult")
        .textContent =
        `${input.toFixed(2)} × ${weight.toFixed(1)} = ${output.toFixed(2)}`;

}


inputSlider.addEventListener(
    "input",
    updateNeuron
);

weightSlider.addEventListener(
    "input",
    updateNeuron
);

updateNeuron();


/* =========================================================
   GRADIENT DESCENT
========================================================= */

const gradientCanvas =
    document.getElementById(
        "gradientCanvas"
    );

const gradientCtx =
    gradientCanvas.getContext(
        "2d"
    );


let gradientX = -2.5;

let gradientRunning = false;

let gradientAnimation;


function drawGradientGraph() {

    const width =
        gradientCanvas.width;

    const height =
        gradientCanvas.height;


    gradientCtx.clearRect(
        0,
        0,
        width,
        height
    );


    /* Axes */

    gradientCtx.strokeStyle =
        "rgba(255,255,255,0.2)";

    gradientCtx.lineWidth = 1;


    gradientCtx.beginPath();

    gradientCtx.moveTo(
        40,
        height - 35
    );

    gradientCtx.lineTo(
        width - 20,
        height - 35
    );

    gradientCtx.stroke();


    gradientCtx.beginPath();

    gradientCtx.moveTo(
        40,
        20
    );

    gradientCtx.lineTo(
        40,
        height - 35
    );

    gradientCtx.stroke();


    /* Loss curve */

    gradientCtx.beginPath();


    for (
        let x = -3;
        x <= 3;
        x += 0.05
    ) {

        const y =
            x * x;


        const px =
            40 +
            ((x + 3) / 6) *
            (width - 60);


        const py =
            height -
            35 -
            (y / 9) *
            (height - 70);


        if (x === -3) {

            gradientCtx.moveTo(
                px,
                py
            );

        } else {

            gradientCtx.lineTo(
                px,
                py
            );

        }

    }


    gradientCtx.strokeStyle =
        "#22d3ee";

    gradientCtx.lineWidth = 4;

    gradientCtx.stroke();


    /* Current point */

    const pointY =
        gradientX * gradientX;


    const pointPX =
        40 +
        ((gradientX + 3) / 6) *
        (width - 60);


    const pointPY =
        height -
        35 -
        (pointY / 9) *
        (height - 70);


    gradientCtx.beginPath();

    gradientCtx.arc(
        pointPX,
        pointPY,
        9,
        0,
        Math.PI * 2
    );


    gradientCtx.fillStyle =
        "#8b5cf6";

    gradientCtx.shadowBlur = 20;

    gradientCtx.shadowColor =
        "#8b5cf6";

    gradientCtx.fill();

    gradientCtx.shadowBlur = 0;


    gradientCtx.fillStyle =
        "white";

    gradientCtx.font =
        "16px Arial";

    gradientCtx.fillText(
        "Loss",
        width - 65,
        25
    );

}


function runGradientDescent() {

    if (!gradientRunning)
        return;


    /* derivative of x² = 2x */

    const gradient =
        2 * gradientX;


    gradientX -=
        gradient * 0.035;


    if (
        Math.abs(gradientX) < 0.02
    ) {

        gradientX = 0;

        gradientRunning = false;

    }


    drawGradientGraph();


    gradientAnimation =
        requestAnimationFrame(
            runGradientDescent
        );

}


document
    .getElementById("gradientStart")
    .addEventListener(
        "click",
        () => {

            if (gradientRunning)
                return;

            gradientRunning = true;

            runGradientDescent();

        }
    );


document
    .getElementById("gradientReset")
    .addEventListener(
        "click",
        () => {

            gradientRunning = false;

            cancelAnimationFrame(
                gradientAnimation
            );

            gradientX = -2.5;

            drawGradientGraph();

        }
    );


drawGradientGraph();


/* =========================================================
   K-MEANS
========================================================= */

const kmeansCanvas =
    document.getElementById(
        "kmeansCanvas"
    );

const kmeansCtx =
    kmeansCanvas.getContext(
        "2d"
    );


let kmeansPoints = [];

let centroids = [];

let kmeansRunning = false;

let kmeansTimer;


function createKMeansData() {

    kmeansPoints = [];


    const groups = [

        {
            x: 160,
            y: 110
        },

        {
            x: 500,
            y: 130
        },

        {
            x: 330,
            y: 270
        }

    ];


    groups.forEach(group => {

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            kmeansPoints.push({

                x:
                    group.x +
                    (Math.random() - 0.5) *
                    120,

                y:
                    group.y +
                    (Math.random() - 0.5) *
                    90,

                cluster:
                    Math.floor(
                        Math.random() * 3
                    )

            });

        }

    });


    centroids = [

        {
            x: 150,
            y: 100
        },

        {
            x: 500,
            y: 260
        },

        {
            x: 330,
            y: 100
        }

    ];

}


function distanceBetween(a, b) {

    const dx =
        a.x - b.x;

    const dy =
        a.y - b.y;

    return Math.sqrt(
        dx * dx + dy * dy
    );

}


function kmeansIteration() {

    /* Assign */

    kmeansPoints.forEach(point => {

        let nearest = 0;

        let nearestDistance =
            Infinity;


        centroids.forEach(
            (centroid, index) => {

                const distance =
                    distanceBetween(
                        point,
                        centroid
                    );


                if (
                    distance <
                    nearestDistance
                ) {

                    nearestDistance =
                        distance;

                    nearest =
                        index;

                }

            }
        );


        point.cluster =
            nearest;

    });


    /* Update */

    centroids.forEach(
        (centroid, index) => {

            const clusterPoints =
                kmeansPoints.filter(
                    point =>
                        point.cluster === index
                );


            if (
                clusterPoints.length === 0
            )
                return;


            centroid.x =
                clusterPoints.reduce(
                    (sum, point) =>
                        sum + point.x,
                    0
                ) /
                clusterPoints.length;


            centroid.y =
                clusterPoints.reduce(
                    (sum, point) =>
                        sum + point.y,
                    0
                ) /
                clusterPoints.length;

        }
    );


    drawKMeans();

}


function drawKMeans() {

    const width =
        kmeansCanvas.width;

    const height =
        kmeansCanvas.height;


    kmeansCtx.clearRect(
        0,
        0,
        width,
        height
    );


    /* Grid */

    kmeansCtx.strokeStyle =
        "rgba(255,255,255,0.05)";

    for (
        let x = 0;
        x < width;
        x += 50
    ) {

        kmeansCtx.beginPath();

        kmeansCtx.moveTo(
            x,
            0
        );

        kmeansCtx.lineTo(
            x,
            height
        );

        kmeansCtx.stroke();

    }


    for (
        let y = 0;
        y < height;
        y += 50
    ) {

        kmeansCtx.beginPath();

        kmeansCtx.moveTo(
            0,
            y
        );

        kmeansCtx.lineTo(
            width,
            y
        );

        kmeansCtx.stroke();

    }


    const pointColors = [

        "#22d3ee",

        "#8b5cf6",

        "#22c55e"

    ];


    /* Points */

    kmeansPoints.forEach(point => {

        kmeansCtx.beginPath();

        kmeansCtx.arc(
            point.x,
            point.y,
            6,
            0,
            Math.PI * 2
        );


        kmeansCtx.fillStyle =
            pointColors[
                point.cluster
            ];


        kmeansCtx.fill();

    });


    /* Centroids */

    centroids.forEach(
        (centroid, index) => {

            kmeansCtx.beginPath();

            kmeansCtx.arc(
                centroid.x,
                centroid.y,
                12,
                0,
                Math.PI * 2
            );


            kmeansCtx.strokeStyle =
                "white";

            kmeansCtx.lineWidth = 3;

            kmeansCtx.stroke();


            kmeansCtx.beginPath();

            kmeansCtx.moveTo(
                centroid.x - 8,
                centroid.y
            );

            kmeansCtx.lineTo(
                centroid.x + 8,
                centroid.y
            );

            kmeansCtx.moveTo(
                centroid.x,
                centroid.y - 8
            );

            kmeansCtx.lineTo(
                centroid.x,
                centroid.y + 8
            );


            kmeansCtx.strokeStyle =
                pointColors[index];

            kmeansCtx.stroke();

        }
    );

}


document
    .getElementById("kmeansStart")
    .addEventListener(
        "click",
        () => {

            if (kmeansRunning)
                return;


            kmeansRunning = true;


            let iterations = 0;


            kmeansTimer =
                setInterval(
                    () => {

                        kmeansIteration();

                        iterations++;


                        if (
                            iterations >= 12
                        ) {

                            clearInterval(
                                kmeansTimer
                            );

                            kmeansRunning =
                                false;

                        }

                    },
                    500
                );

        }
    );


document
    .getElementById("kmeansReset")
    .addEventListener(
        "click",
        () => {

            clearInterval(
                kmeansTimer
            );

            kmeansRunning = false;

            createKMeansData();

            drawKMeans();

        }
    );


createKMeansData();

drawKMeans();


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {

        question:
            "What does AI stand for?",

        options: [

            "Artificial Intelligence",

            "Automated Internet",

            "Advanced Integration",

            "Artificial Information"

        ],

        answer: 0

    },


    {

        question:
            "Which learning method uses labelled training data?",

        options: [

            "Supervised Learning",

            "Unsupervised Learning",

            "Reinforcement Learning",

            "Random Learning"

        ],

        answer: 0

    },


    {

        question:
            "Which algorithm is commonly used for clustering?",

        options: [

            "Linear Regression",

            "K-Means",

            "Logistic Regression",

            "Naive Bayes"

        ],

        answer: 1

    },


    {

        question:
            "What is the purpose of an activation function?",

        options: [

            "Store data",

            "Add non-linearity",

            "Delete neurons",

            "Create datasets"

        ],

        answer: 1

    },


    {

        question:
            "What does CNN commonly process?",

        options: [

            "Images",

            "Only numbers",

            "Databases",

            "Operating systems"

        ],

        answer: 0

    },


    {

        question:
            "What does NLP stand for?",

        options: [

            "Neural Learning Program",

            "Natural Language Processing",

            "Network Learning Protocol",

            "Natural Logic Programming"

        ],

        answer: 1

    },


    {

        question:
            "Which algorithm finds a minimum by following the gradient?",

        options: [

            "KNN",

            "Gradient Descent",

            "Decision Tree",

            "Naive Bayes"

        ],

        answer: 1

    },


    {

        question:
            "What is reinforcement learning based on?",

        options: [

            "Rewards and actions",

            "Only labelled images",

            "Database queries",

            "HTML"

        ],

        answer: 0

    },


    {

        question:
            "What does an LLM primarily work with?",

        options: [

            "Language",

            "Only images",

            "Only sensors",

            "Only spreadsheets"

        ],

        answer: 0

    },


    {

        question:
            "What is overfitting?",

        options: [

            "Model performs well only on training data",

            "Model has no data",

            "Model has no parameters",

            "Model never trains"

        ],

        answer: 0

    }

];


let currentQuestion = 0;

let quizScore = 0;

let quizAnswered = false;


function renderQuiz() {

    const container =
        document.getElementById(
            "questionContainer"
        );


    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        renderQuizResult();

        return;

    }


    const question =
        quizQuestions[
            currentQuestion
        ];


    quizAnswered = false;


    document
        .getElementById("quizNumber")
        .textContent =
        `Question ${
            currentQuestion + 1
        } of ${
            quizQuestions.length
        }`;


    document
        .getElementById("quizScore")
        .textContent =
        `Score: ${quizScore}`;


    container.innerHTML = `

        <h3 class="question-title">
            ${question.question}
        </h3>

        <div class="options">

            ${question.options
                .map(
                    (option, index) => `

                    <button
                        class="option-btn"
                        data-answer="${index}">

                        ${String.fromCharCode(
                            65 + index
                        )}.
                        ${option}

                    </button>

                `
                )
                .join("")}

        </div>

    `;


    document
        .getElementById(
            "nextQuestion"
        )
        .disabled = true;


    document
        .querySelectorAll(
            ".option-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    answerQuestion(
                        Number(
                            button.dataset.answer
                        )
                    );

                }
            );

        });

}


function answerQuestion(answer) {

    if (quizAnswered)
        return;


    quizAnswered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            ".option-btn"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled = true;


            if (
                index ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        answer ===
        question.answer
    ) {

        quizScore++;

    } else {

        buttons[
            answer
        ].classList.add(
            "wrong"
        );

    }


    document
        .getElementById(
            "quizScore"
        )
        .textContent =
        `Score: ${quizScore}`;


    document
        .getElementById(
            "nextQuestion"
        )
        .disabled = false;

}


document
    .getElementById(
        "nextQuestion"
    )
    .addEventListener(
        "click",
        () => {

            currentQuestion++;

            renderQuiz();

        }
    );


function renderQuizResult() {

    document
        .getElementById(
            "questionContainer"
        )
        .innerHTML = `

        <div class="quiz-result">

            <div style="font-size:60px;">
                ${
                    quizScore >= 8
                        ? "🏆"
                        : quizScore >= 5
                        ? "👏"
                        : "📚"
                }
            </div>

            <h2>
                Quiz Complete!
            </h2>

            <p>
                You scored
                <strong>
                    ${quizScore}
                </strong>
                out of
                <strong>
                    ${quizQuestions.length}
                </strong>.
            </p>

        </div>

    `;


    document
        .getElementById(
            "nextQuestion"
        )
        .textContent =
        "↻ Restart Quiz";


    document
        .getElementById(
            "nextQuestion"
        )
        .disabled = false;


    document
        .getElementById(
            "nextQuestion"
        )
        .onclick = () => {

            currentQuestion = 0;

            quizScore = 0;

            document
                .getElementById(
                    "nextQuestion"
                )
                .textContent =
                "Next Question →";

            renderQuiz();

        };

}


renderQuiz();


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            lessonModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

console.log(
    "🤖 AI Learning Academy loaded successfully!"
);

console.log(
    "🧠 Neural network background active."
);

console.log(
    "🧪 AI Labs initialized."
);

console.log(
    "📝 Quiz initialized."
);