<?php

require "init.php";
$PDO = db_connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
}

$request_method = $_SERVER["REQUEST_METHOD"];
switch ($request_method) {
    case 'GET':
        // Retrive Products
        if (!empty($_GET["id_evento"])) {
            $id_evento = intval($_GET["id_evento"]);
            getEvento($id_evento);
        } else {
            getEvento();
        }
        break;
    case 'POST':
        // Insert Product
        if (empty($_POST["id_evento"])) {
            insereEvento();
        } else {
            $id_evento = intval($_GET["id_evento"]);
            updateEvento($id_evento);
        }
        break;
    case 'DELETE':
        // Delete Product
        $id_evento = intval($_GET["id_evento"]);
        deleteEvento($id_evento);
        break;
    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function getEvento($id_evento = 0)
{
    $PDO = db_connect();
    $sql = "SELECT id_evento, id_cadastro, vlr from evento "
    if ($id_evento != 0) {
        $sql .= " WHERE id_evento = " . $id_evento . " LIMIT 1";
    }
    $sql.= " order by 1";

    try {
        $stmt = $PDO->prepare($sql);
        $response = array();
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $message = "Erro ao selecionar Evento " . $e->getMessage();
    } catch (Exception $e) {
        $message = "General Error: Evento não selecionado " . $e->getMessage();
    }

    if (isset($stmt)) {
        echo json_encode($response);
    } else {
        header("HTTP/1.0 400 Bad Request");
        $response = array(
            'status_message' => $message
        );
    }
}

function insereEvento()
{
    $data = getRequestDataBody();
    $message = "";

    if ($data !== []) {
        $id_evento = $data["id_evento"];
        $id_cadastro = $data["id_cadastro"];
        $vlr = $data["vlr"];

        $PDO = db_connect();
        $sql = "INSERT INTO evento (id_evento, id_cadastro, vlr) VALUES (?, ?, ?)";

        try {
            $PDO->beginTransaction();
            $stmt = $PDO->prepare($sql)->execute([$id_evento, $id_cadastro, $id_valor]);
            $PDO->commit();
        } catch (PDOException $e) {
            $PDO->rollBack();
            $message = "Erro ao adicionar evento " . $e->getMessage();
        } catch (Exception $e) {
            $PDO->rollBack();
            $message = "General Error: evento não registrado " . $e->getMessage();
        }

        if (isset($stmt) && isset($stmtDebito)) {
            $response = array(
                'cad ' => $data
            );
        } else {
            header("HTTP/1.0 400 Bad Request");
            $response = array(
                'status_message' => $message
            );
        }
        // 	header('Content-Type: application/json');
        echo json_encode($response);
    }
}

