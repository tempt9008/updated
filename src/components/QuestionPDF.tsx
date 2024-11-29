import { Page, Text, Document, StyleSheet, View, Image } from '@react-pdf/renderer';
import { Question } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Baloo', // Updated to use Kannada font
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Baloo', // Updated to use Kannada font
  },
  questionContainer: {
    marginBottom: 25,
    breakInside: 'avoid',
  },
  questionText: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Baloo', // Updated to use Kannada font
    lineHeight: 1.4,
  },
  questionStatus: {
    fontSize: 10,
    marginBottom: 5,
    color: '#666666',
    fontFamily: 'Baloo', // Updated to use Kannada font
  },
  imageContainer: {
    marginBottom: 15,
    maxHeight: 200,
    alignItems: 'center',
  },
  questionImage: {
    objectFit: 'contain',
    maxWidth: '80%',
    maxHeight: 180,
  },
  options: {
    marginLeft: 20,
    marginTop: 8,
  },
  option: {
    marginBottom: 8,
    fontSize: 11,
    lineHeight: 1.3,
    fontFamily: 'Baloo', // Updated to use Kannada font
  },
  answerSection: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#999',
    paddingTop: 20,
  },
  answerTitle: {
    fontSize: 14,
    marginBottom: 15,
    fontFamily: 'Baloo', // Updated to use Kannada font
  },
  answerKey: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  answer: {
    width: '50%',
    marginBottom: 8,
    fontSize: 11,
    lineHeight: 1.3,
    fontFamily: 'Baloo', // Updated to use Kannada font
  },
  answerLine: {
    marginBottom: 8,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    borderBottomStyle: 'dotted',
  },
});

interface QuestionPDFProps {
  title: string;
  questions: Question[];
  includeAnswers?: boolean;
}

export const QuestionPDF = ({ title, questions, includeAnswers = true }: QuestionPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>

      {/* Questions Section */}
      {questions.map((question, index) => (
        <View key={question.id} style={styles.questionContainer} wrap={false}>
          {!question.is_active && (
            <Text style={styles.questionStatus}>(Inactive Question)</Text>
          )}
          <Text style={styles.questionText}>
            {index + 1}. {question.question}
          </Text>

          {question.type === 'image' && question.image_url && (
            <View style={styles.imageContainer}>
              <Image
                src={question.image_url}
                style={styles.questionImage}
                cache={false}
              />
            </View>
          )}

          {question.type === 'text' && (
            <View style={styles.answerLine} />
          )}

          {question.type === 'multichoice' && question.options && (
            <View style={styles.options}>
              {question.options.map((option, optIndex) => (
                <Text key={optIndex} style={styles.option}>
                  {String.fromCharCode(97 + optIndex)}. {option}
                </Text>
              ))}
            </View>
          )}

          {question.type === 'truefalse' && (
            <View style={styles.options}>
              <Text style={styles.option}>a. True</Text>
              <Text style={styles.option}>b. False</Text>
            </View>
          )}

          {question.type === 'image' && (
            <View style={styles.answerLine} />
          )}
        </View>
      ))}

      {/* Answer Key Section */}
      {includeAnswers && questions.length > 0 && (
        <View style={styles.answerSection} wrap={false}>
          <Text style={styles.answerTitle}>Answer Key:</Text>
          <View style={styles.answerKey}>
            {questions.map((question, index) => (
              <Text key={question.id} style={styles.answer}>
                {index + 1}. {question.correct_answer}
                {!question.is_active ? ' (Inactive)' : ''}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);
