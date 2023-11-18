// src/StudentManagementSystem.ts
// import * as inquirer from 'inquirer';
import inquirer from "inquirer";

class Student {
  constructor(
    public name: string,
    public id: number,
    public courses: string[],
    public balance: number
  ) {}

  showStatus() {
    console.log(`Student ID: ${this.id}`);
    console.log(`Student Name: ${this.name}`);
    console.log("Enrolled Courses:", this.courses.join(", "));
    console.log(`Balance: $${this.balance}`);
  }
}

class StudentManagementSystem {
  private students: Student[] = [];
  private currentId: number = 1;

  private async addStudent() {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter student name:",
      },
    ]);

    const newStudent = new Student(answers.name, this.currentId++, [], 0);
    this.students.push(newStudent);

    console.log(`Student ${newStudent.name} added with ID ${newStudent.id}.`);
  }

  private async enrollStudent() {
    const studentChoices = this.students.map((student) => ({
      name: student.name,
      value: student,
    }));

    const courseChoices = ["Math", "History", "English"];

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "student",
        message: "Select a student to enroll:",
        choices: studentChoices,
      },
      {
        type: "checkbox",
        name: "courses",
        message: "Select courses to enroll:",
        choices: courseChoices,
      },
    ]);

    answers.student.courses.push(...answers.courses);
    console.log(
      `${answers.student.name} enrolled in ${answers.courses.join(
        ", "
      )} courses.`
    );
  }

  private showMenu() {
    console.log("\nStudent Management System\n");
    console.log("1. Add Student");
    console.log("2. Enroll Student");
    console.log("3. Show Status");
    console.log("4. Exit");
  }

  public async start() {
    let isRunning = true;

    while (isRunning) {
      this.showMenu();

      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "choice",
          message: "Enter your choice:",
        },
      ]);

      switch (answer.choice) {
        case "1":
          await this.addStudent();
          break;
        case "2":
          await this.enrollStudent();
          break;
        case "3":
          this.showStatus();
          break;
        case "4":
          isRunning = false;
          break;
        default:
          console.log("Invalid choice. Please try again.");
      }
    }

    console.log("Goodbye!");
  }

  private showStatus() {
    this.students.forEach((student) => {
      student.showStatus();
      console.log("---");
    });
  }
}

const sms = new StudentManagementSystem();
sms.start();
