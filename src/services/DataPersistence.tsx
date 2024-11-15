import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc, addDoc, type DocumentData, doc, deleteDoc, getDoc, type QueryDocumentSnapshot, FirestoreError } from 'firebase/firestore'
import { type Block, type Client, type Day, type Exercise, type ExerciseReference, type ExerciseType, type Iteration, type Max, type Week, type WorkoutSchedule, type WorkoutScheduleState, type UserMetadata } from '../types/types'
import { v4 as uuidv4 } from 'uuid'

export default class DataPersistence {
  firebaseConfig = {
    apiKey: 'AIzaSyCfDq2attDqWMrxVXrJxLtFdP3rSXTZFXo',
    authDomain: 'cully-strength.firebaseapp.com',
    projectId: 'cully-strength',
    storageBucket: 'cully-strength.appspot.com',
    messagingSenderId: '374950825055',
    appId: '1:374950825055:web:c6452a92677096d8bd1fea',
    measurementId: 'G-R739SFTWWT'
  }

  firebaseApp: FirebaseApp

  constructor () {
    this.firebaseApp = initializeApp(this.firebaseConfig)
  }

  buildClientFromApiResponse (data: DocumentData, id: string): Client {
    const firstName = data.firstName
    const lastName = data.lastName
    const email = data.email
    const newMaxes: Max[] = []
    const scheduleId = data.scheduleId
    data.maxes.forEach((max: any) => {
      newMaxes.push({
        name: max.name,
        weight: max.weight
      })
    })
    const newClient: Client = {
      id,
      firstName,
      lastName,
      maxes: newMaxes,
      email,
      scheduleId
    }
    return newClient
  }

  buildScheduleFromApiResponse (data: DocumentData): WorkoutSchedule {
    const schedule: WorkoutSchedule = {
      Id: data.Id,
      Name: data.Name,
      Blocks: [],
      CurrentBlock: data.CurrentBlock,
      CurrentWeek: data.CurrentWeek
    }
    data.Blocks.forEach((block: any) => {
      schedule.Blocks.push(this.buildBlockFromApiReponse(block))
    })
    return schedule
  }

  buildExerciseFromApiResponse (exerciseData: any): Exercise {
    const exercise: Exercise = {
      Id: exerciseData.Id ?? uuidv4(),
      Name: exerciseData.Name,
      Multiplier: exerciseData.Multiplier,
      Sets: exerciseData.Sets,
      Reps: exerciseData.Reps,
      Type: exerciseData.Type,
      MaxReference: exerciseData.MaxReference
    }
    return exercise
  }

  buildDayFromApiResponse (dayData: any): Day {
    const day: Day = {
      Exercises: []
    }
    dayData.Exercises.forEach((ex: any) => {
      day.Exercises.push(this.buildExerciseFromApiResponse(ex))
    })
    return day
  }

  buildWeekFromApiResponse (weekData: any): Week {
    const week: Week = {
      Days: []
    }
    weekData.Days.forEach((day: any) => {
      week.Days.push(this.buildDayFromApiResponse(day))
    })
    return week
  }

  buildBlockFromApiReponse (blockData: any): Block {
    const block: Block = {
      Weeks: []
    }
    blockData.Weeks.forEach((week: any) => {
      block.Weeks.push(this.buildWeekFromApiResponse(week))
    })
    return block
  }

  async getUserMetadata (username: string): Promise<UserMetadata> {
    const db = getFirestore(this.firebaseApp)
    const docRef = doc(db, 'UserMetadataV2', username.toLowerCase())
    const data = (await (getDoc(docRef))).data()
    if (data != null) {
      const metadata: UserMetadata = {
        Role: data.Role,
        Username: data.Username,
        Id: data.Id
      }
      return metadata
    } else throw FirestoreError
  }

  async getClient (id: string): Promise<Client> {
    const db = getFirestore(this.firebaseApp)
    const docRef = doc(db, 'ClientsV2', id)
    const docResponse = await (getDoc(docRef))
    const data = docResponse.data()
    if (data != null) {
      const client: Client = this.buildClientFromApiResponse(data, docResponse.id)
      return client
    } else throw FirestoreError
  }

  async getSchedules (): Promise<WorkoutSchedule[]> {
    const db = getFirestore(this.firebaseApp)
    const schedulesCollection = collection(db, 'Schedules')
    const schedulesSnapshot = await getDocs(schedulesCollection)
    const scheduleList: WorkoutSchedule[] = []
    schedulesSnapshot.docs.forEach((s: QueryDocumentSnapshot) => {
      scheduleList.push(this.buildScheduleFromApiResponse(s.data()))
    })
    return scheduleList
  }

  async getExercises (): Promise<ExerciseReference[]> {
    const db = getFirestore(this.firebaseApp)
    const exerciseReferenceCollecion = collection(db, 'ExercisesV2')
    const exerciseRefSnapshot = await getDocs(exerciseReferenceCollecion)
    const exerciseRefList: ExerciseReference[] = []
    exerciseRefSnapshot.forEach(ref => {
      const newRef: ExerciseReference = {
        name: ref.data().Name,
        type: ref.data().Type,
        id: ref.id
      }
      exerciseRefList.push(newRef)
    })
    return exerciseRefList.sort((a, b) => a.name.localeCompare(b.name))
  }

  async addNewExercise (exercise: ExerciseType): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    const exerciseReferenceCollecion = collection(db, 'ExercisesV2')
    await addDoc(exerciseReferenceCollecion, exercise)
  }

  async deleteExercise (id: string): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    const docRef = doc(db, `ExercisesV2/${id}`)
    await deleteDoc(docRef)
  }

  async getClients (): Promise<Client[]> {
    const db = getFirestore(this.firebaseApp)
    const clientsCollection = collection(db, 'ClientsV2')
    const clientsSnapshot = await getDocs(clientsCollection)
    const clientsList: Client[] = []
    clientsSnapshot.docs.forEach(c => {
      const newClient: Client = this.buildClientFromApiResponse(c.data(), c.id)
      clientsList.push(newClient)
    })
    return clientsList
  }

  async addNewClient (newClient: Client): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    const docRef = doc(db, `ClientsV2/${newClient.id}`)
    await setDoc(docRef, newClient)
  }

  async addMetadata (metadata: Client): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    const newMetadata: UserMetadata = {
      Role: 0,
      Username: metadata.email.toLowerCase(),
      Id: metadata.id
    }
    const docRef = doc(db, `UserMetadataV2/${metadata.email.toLowerCase()}`)
    await setDoc(docRef, newMetadata)
  }

  async updateClient (client: Client): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    const docRef = doc(db, `ClientsV2/${client.id}`)
    await setDoc(docRef, client)
  }

  async deleteClient (client: Client): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    const docRef = doc(db, `ClientsV2/${client.id}`)
    await deleteDoc(docRef)
  }

  async addNewDay (newDay: Day): Promise<DocumentData> {
    const db = getFirestore(this.firebaseApp)
    const daysCollection = collection(db, 'Days')
    return await addDoc(daysCollection, newDay)
  }

  async deleteSchedule (id: string): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    const docRef = doc(db, `Schedules/${id}`)
    await deleteDoc(docRef)
  }

  async updateSchedules (schedules: WorkoutScheduleState): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    schedules.Schedules.forEach((schedule: WorkoutSchedule): void => {
      const docRef = doc(db, `Schedules/${schedule.Id}`)
      setDoc(docRef, schedule).catch(() => {})
    })
  }

  async addNewSchedule (schedule: WorkoutSchedule): Promise<void> {
    const db = getFirestore(this.firebaseApp)
    await setDoc(doc(db, 'Schedules', schedule.Id), schedule)
  }

  async getIteration (): Promise<Iteration> {
    const db = getFirestore(this.firebaseApp)
    const iterationCollection = collection(db, 'Iterations')
    const iterationSnapshot = await getDocs(iterationCollection)
    const iteration: Iteration = {
      Block: iterationSnapshot.docs[0].data().Block,
      Week: iterationSnapshot.docs[0].data().Week
    }
    return iteration
  }

  async updateExercises (newList: Exercise[]): Promise<void> {

  }
}
