import chair from "../../assets/images/yoga/chair.png";
import cobra from "../../assets/images/yoga/cobra.jpg";
import dog from "../../assets/images/yoga/dog.jpg";
import tree from "../../assets/images/yoga/tree.jpg";
import warrior from "../../assets/images/yoga/warrior.jpg";
import traingle from "../../assets/images/yoga/traingle.jpg";
import shoulderstand from "../../assets/images/yoga/shoulderstand.jpg";

export const poseInstructions = [
  {
    name: "Tree",
    difficulty: "Easy",
    instructions: [
      "Start by standing straight with a long, tall back and your feet aligned and touching. Your arms should be straight along either side of your body.",
      "Take a few breaths and find a place or object in the room to focus your attention. Slowly shift your weight to your left leg and begin to raise your right foot off the floor. Align the sole of your right foot with the inside of your left thigh. The toes should be pointing down and your pelvis should be completely straight.",
      "Stretch your arms straight up toward the ceiling with palms pressed together forming an inverted V.",
      "Hold and repeat. Hold the pose for as long as necessary, making sure to breathe properly. When you’re ready to switch legs, exhale, and return to the pose to start again.",
    ],
  },
  {
    name: "Chair",
    difficulty: "Easy",
    instructions: [
      "Stand straight and tall with your feet slightly wider than hip-width apart and your arms at your sides.",
      "Inhale and lift your arms next to your ears, stretching them straight and parallel with wrists and fingers long. Keep your shoulders down and spine neutral.",
      "Exhale as you bend your knees, keeping your thighs and knees parallel. Lean your torso forward to create a right angle with the tops of your thighs. Keep your neck and head in line with your torso and arms. Hold for 30 seconds to 1 minute.",
    ],
  },
  {
    name: "Dog",
    difficulty: "Normal",
    instructions: [
      "Spread your hands wide on the mat with your arms internally rotated. Position your feet hip-width apart.",
      "With your chin tucked into your chest and pelvic floor engaged, lift your hips and gaze at your toes through your legs.",
      'Keep your legs straight and your heels on the mat. Your body should look like an upside-down "V".',
      "Stay in the pose for 10 or more breaths, then bend your knees on an exhalation and lower yourself.",
    ],
  },
  {
    name: "Cobra",
    difficulty: "Easy",
    instructions: [
      "Begin on your belly with your feet hip-distance apart and your hands beside your ribs. Extend your big toes straight back and press down with all ten toenails to activate your quadriceps.",
      "Rotate your inner thighs toward the ceiling to broaden the lower back. Pressing down lightly with your hands, start to lift your head and chest, rolling your shoulders back and down.",
      "Keep the back of your neck long and focus on lifting your sternum instead of lifting your chin. Straighten your arms while keeping your shoulders remaining away from your ears. Keep at least a slight bend in your elbows.",
      "To exit the pose, release back to your mat.",
    ],
  },
  {
    name: "Warrior",
    difficulty: "Hard",
    instructions: [
      "Begin in lunge with your front knee bent, your back leg straight and your back heel lifted. Your hips and chest should be squared to the front of the mat. Raise your arms above your head.",
      "Move your hands to your heart, with palms pressed against each other in a prayer position. Lean forward until your back leg extends straight back, even with your hips. Keep your foot flexed and your gaze downward.",
      "Make sure your standing leg is strong and straight, but not locked at the knee. Reach your arms forward so your body forms a “T” shape.",
    ],
  },
  {
    name: "Triangle",
    difficulty: "Normal",
    instructions: [
      "Begin standing, then lightly jump your feet apart to a wide position about three to four feet apart. Turn your left foot out and turn to face that direction. Take a slight bend in your left leg and raise your arms out on your sides, forming a “T” shape.",
      "Straighten through your left leg, then hinge and reach your torso over your left leg as your hips jut back. Rotate your left palm so it faces the ceiling, and gaze out over your left arm.",
      "Maintain a long, straight spine as you reach your left hand to the mat, placing it in front of your left foot. If you feel off balance, bring in your back leg closer to shorten your stance. Gaze towards your right arm, which should be extended overhead. Hold and repeat on the other side.",
    ],
  },
  {
    name: "Shoulderstand",
    difficulty: "Hard",
    instructions: [
      "Start with a stack of two folded blankets. Lay down on your mat aligning shoulders onto the blankets. With legs bent and feet on the floor (as if setting up for bridge pose) begin to walk your shoulders underneath your upper back feeling the chest gently rising.",
      "Lift your hips off of the mat coming into bridge pose and extend your arms onto the ground, palms facing down as if your hands could touch your heels. Press firmly into the palms using them as leverage to lift onto the balls of the feet and extend one leg up. Bend at the elbows, place your hands on your low back creating a shelf, and then extend the next leg up.",
      "Once you raise the legs, don't turn your head to the side to look around the room, since you can injure your neck. Keep your gaze upward and your neck straight.",
      "Lift up through the balls of your feet. Walk your hands further up the back for more stability. Feel the chest reaching towards the chin to support opening the upper back.",
      "Move your hips toward the front of the room and your feet toward the back of the room to straighten the body. The correct alignment is with the hips over the shoulders and feet over the hips. Ask your teacher or a friend to help you determine if your legs are perpendicular to the floor.",
      "Stay in the pose for up to 10 breaths.",
    ],
  },
];

export const poseImages = {
  Tree: tree,
  Cobra: cobra,
  Dog: dog,
  Warrior: warrior,
  Chair: chair,
  Triangle: traingle,
  Shoulderstand: shoulderstand,
};

export const POINTS = {
  NOSE: 0,
  LEFT_EYE: 1,
  RIGHT_EYE: 2,
  LEFT_EAR: 3,
  RIGHT_EAR: 4,
  LEFT_SHOULDER: 5,
  RIGHT_SHOULDER: 6,
  LEFT_ELBOW: 7,
  RIGHT_ELBOW: 8,
  LEFT_WRIST: 9,
  RIGHT_WRIST: 10,
  LEFT_HIP: 11,
  RIGHT_HIP: 12,
  LEFT_KNEE: 13,
  RIGHT_KNEE: 14,
  LEFT_ANKLE: 15,
  RIGHT_ANKLE: 16,
};

export const keypointConnections = [
  { from: "nose", to: "left_eye" },
  { from: "right_eye", to: "nose" },
  { from: "left_eye", to: "left_ear" },
  { from: "right_eye", to: "right_ear" },
  { from: "left_shoulder", to: "right_shoulder" },
  { from: "right_shoulder", to: "right_elbow" },
  { from: "right_elbow", to: "right_wrist" },
  { from: "left_shoulder", to: "left_elbow" },
  { from: "left_elbow", to: "left_wrist" },
  { from: "left_shoulder", to: "left_hip" },
  { from: "left_hip", to: "left_knee" },
  { from: "left_knee", to: "left_ankle" },
  { from: "right_shoulder", to: "right_hip" },
  { from: "right_hip", to: "right_knee" },
  { from: "right_knee", to: "right_ankle" },
];

export const CLASS_NO = {
  Chair: 0,
  Cobra: 1,
  Dog: 2,
  No_Pose: 3,
  Shoulderstand: 4,
  Traingle: 5,
  Tree: 6,
  Warrior: 7,
};
